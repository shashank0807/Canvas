const express = require ('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.render("index")
});

app.get('/register', (req, res)=>{
    res.render("register")
});

app.post('/register', async (req, res)=>{
    let {name, username, password, email, age} = req.body;
    let user = await userModel.findOne({email})
    if (user) return res.status(500).send("User with same email already exists");
    else { 
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, async (err, hash)=>{
              let createdUser = await userModel.create({
                name,
                username,
                email,
                password: hash,
                age
                });

                let token = jwt.sign({email: createdUser.email, userid: createdUser._id},'secret');
                res.cookie('token', token);
                res.send(`<script> 
                            alert("Account Created successfully!"); 
                            window.location.href = "/login";
                    </script>`);
            })
        })
    }  
});

app.get('/login', (req, res)=>{
    res.render("login")
});

app.post('/login', async (req, res)=>{
    let {email, password} = req.body;
    let user= await userModel.findOne({email});
    if(!user) res.send(`<script> 
                            alert("Invalid Credentials"); 
                            window.location.href = "/login";
                    </script>`);
     
     bcrypt.compare(password, user.password, (err, result)=>{
        if(result) {
            let token = jwt.sign({email: user.email, userid: user._id},'secret');
            res.cookie('token', token);
            res.status(200).redirect('/profile') 
        }

        else res.send(`<script> 
                            alert("Invalid Credentials"); 
                            window.location.href = "/login";
                    </script>`);
     })               
});

app.get('/profile',isLoggedIn, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate("posts");
    res.render('profile', {user});
});

app.get('/like/:id',isLoggedIn, async (req, res)=>{
    let post = await postModel.findOne({_id: req.params.id}).populate("user");

    if(post.likes.indexOf(req.user.userid)=== -1){

        post.likes.push(req.user.userid);
    }
    else {
        post.likes.splice(post.likes.indexOf(req.user.userid),1);
    }
    
    await post.save();
    res.redirect('/profile');
});

app.get('/edit/:id',isLoggedIn, async (req, res)=>{
    let post = await postModel.findOne({_id: req.params.id}).populate("user");

    
    res.render('edit', {post});
});

app.post('/update/:id',isLoggedIn, async (req, res)=>{
    let post = await postModel.findOneAndUpdate({_id: req.params.id}, {content:req.body.content});

    
    res.redirect('/profile');
});




app.post('/post',isLoggedIn, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email});

    let post = await postModel.create({
        user: user._id,
        content: req.body.content,
    });

 user.posts.push(post._id);
 await user.save();
 res.redirect('/profile')
});

app.get('/logout', (req, res)=>{
    res.cookie('token', '');
    res.redirect("login");
});

function isLoggedIn(req, res, next){
    if(req.cookies.token === '') res.redirect('/login');
    else {
       let data =  jwt.verify(req.cookies.token, "secret");
       req.user = data;
       next();
    }
}


app.listen(3000);