# React-Blog Learning 📖

💡 A simple repository with code developed to learn some basic concepts of React, using some JS tools in a fullstack blog-themed application.  
💡 It's the same application as in my React_Blog_Learning_JS repository, but using TS and other features I wanted to explore.

## Currently used tools 🧰
### 🔧 Vite - Build, configure and run.  
### 🪜 React router - Routing using React compatibility.
### 🖌️ React - Responsive front-end.  
### 🧩 TypeScript - Type consistency.
### 🐬 MySQL - Database.

## Tools used only in the Express server 🧰
### 🚋 Express - Run the server-side, manage routing.
### ⛏️ Knex - SQL building and data management in JS/Express.

## Tolls used only in the NestJS server 🧰
### 🪺 NestJS - Run the server-side, manage routing and data management.
### 🛂 Passport.js - Manage user authentication.

## How to run ✔️
❗ Be sure you have Node.js (recommended >= 16.x) and npm or Yarn installed.

⌨️ In a terminal, navigate to the folder you want to clone the repository, then run:
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
   - ❗If you're going to use the Express server:
      -  Check if your connection match the configurations specified in the server/knexfile.js file
   - ❗Since I implemented NestJS, the Express server code was not updated, so running the Nest server will make it change some of it's structure, and maybe the Express server won't work properly anymore.
4. Start both parts (two terminal windows/tabs)
   - Start server:
      - NestJS 🪺 :
         - cd server
         - npm run run start:dev
      - Express 🚋 :
         - cd server_express
         - npm run start / node server.js
   - Start client:
     - cd client
     - npm run dev / npm start

5. Access the localhost url provided.
