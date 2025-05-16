Canvas — A Social Media Backend Project
Overview
Canvas is a social media web application backend where users can:

Register and log in securely

Create, edit, and post text-based updates

Like posts with visible like counts

Log out safely

Features
Passwords are hashed securely using Bcrypt

Uses JWT tokens stored as cookies for persistent sessions

Protected routes restrict access to authenticated users only

Handles incorrect login attempts gracefully

Tech Stack
Backend: Node.js, Express.js, MongoDB (via Mongoose), Bcrypt, JWT, Cookie-Parser

Frontend: EJS templates styled with Tailwind CSS

Installation
Clone the repo:

bash
Copy
Edit
git clone https://github.com/shashank0807/Canvas.git
Navigate into the directory:

bash
Copy
Edit
cd Canvas
Install dependencies:

bash
Copy
Edit
npm install
Set up your environment variables (e.g., MongoDB URI, JWT secret) in a .env file.

Start the server:

bash
Copy
Edit
npm start
Open your browser at http://localhost:3000

Usage
Register a new user account.

Log in to create, edit, like posts, and log out.
