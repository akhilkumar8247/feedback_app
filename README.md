# Feedback App

A **centralized feedback collection system** designed to be reused across multiple projects.  
Built with a **React + TypeScript frontend** and a **Node.js + Express backend**.

---

## 🎯 Goal
The main motive of this app is to **maintain a single database** for feedback,  
avoiding the need to create separate feedback systems for each new project.  

- Stores feedback in **CSV files** for lightweight storage.  
- Separates feedback by **app name**, so you can track which project the feedback came from.  
- Can be easily integrated into any new project (just send feedback to this app).  

---


## 📂 Project Structure
feedback_app/
│── backend/ # Node.js + Express server
│── project/ # React + TypeScript frontend
│── package.json # Project dependencies
│── .gitignore
---

## 🚀 Features
- Submit feedback through a frontend form  
- Store feedback in the backend  
- Dashboard to view submitted feedback  
- Sorting and filtering options  

---

## ⚙️ Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/akhilkumar8247/feedback_app.git
   cd feedback_app

cd backend
npm install

cd ../project
npm install

cd backend
node server.js

cd project
npm run dev

Frontend will be available at http://localhost:5173 (or similar)
Backend will be running at http://localhost:3000

Tech Stack
Frontend: React, TypeScript, Vite

Backend: Node.js, Express

Database: will be saved in csv file 







