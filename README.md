# React-Blog Learning 📖

💡 A simple repository with code developed to learn some basic concepts of React, using some JS tools in a fullstack blog-themed application.  

## Currently used tools 🧰
### 🔧 Vite - Build, configure and run.  
### 🪜 React router - Routing using React compatibility.
### ⛏️ Knex - SQL building and data management in JS.
### 🖌️ React - Responsive front-end.  

## How to run ✔️
❗ Be sure you have Node.js (recommended >= 16.x) and npm or Yarn installed.

⌨️ In a terminal and in the folder you want to clone the repository, run:
1. Clone the repo  
   - git clone https://github.com/LeSilveira/React_Blog_Learning.git
   - cd React_Blog_Learning

2. Install dependencies
   - Server:
     - cd server
     - npm install
   - Client:
     - cd ../client
     - npm install
3. Prepare the database
   - Open the single db.sql file that's inside the database folder in a MySQL query editor.
   - Run it to create the database (already with data).
   - ❗ Check if your connection match the configurations specified in the server/knexfile.js file 
4. Start both parts (two terminal windows/tabs)
   - Start server:
     - cd server
     - npm run start / node server.js
   - Start client:
     - cd client
     - npm run dev

5. Access the localhost url provided.
