Canvas — Social Media Backend
A simple and secure social media backend app where users can register, log in, create/edit posts, like posts, and log out.

💻 Demo: https://youtu.be/89RG03w8XaY

🚀 Features
User Authentication: Secure registration and login

Password Security: Passwords hashed with Bcrypt

Session Management: Persistent login using JWT tokens stored in cookies

Post Management: Create, edit, and like text-based posts with real-time like counts

Protected Routes: Only logged-in users can access certain features

Error Handling: Graceful handling of incorrect login details

🛠️ Tech Stack
Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Authentication: JWT, Bcrypt

Middleware: Cookie-Parser

Frontend: EJS templates with Tailwind CSS

📁 Project Structure
bash
Copy
Edit
Canvas/
│
├── controllers/          # Route handlers and business logic
│   └── authController.js
│   └── postController.js
│
├── models/               # Mongoose models (User, Post)
│   └── User.js
│   └── Post.js
│
├── public/               # Static assets (CSS, JS, images)
│   └── css/
│   └── js/
│
├── routes/               # Express route definitions
│   └── authRoutes.js
│   └── postRoutes.js
│
├── views/                # EJS templates for frontend
│   └── partials/
│   └── auth/
│   └── posts/
│   └── index.ejs
│
├── .env                  # Environment variables (not committed)
├── app.js                # Main Express app setup
├── package.json          # Project metadata & dependencies
└── README.md             # Project documentation

✍️ Author: https://www.linkedin.com/in/shashank0807/


