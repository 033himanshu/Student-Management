# 📚 Student Management System

A full-stack **Student Management System** built with **MERN stack**.  
It allows uploading, managing, updating, and deleting student records with pagination support.  

🌐 **Live Links**  
- **Frontend (React + Vercel):** [Student Management Frontend](https://student-management-kappa-khaki.vercel.app/)  
- **Backend (Express + Railway):** [Student Management API](https://student-management-production-7532.up.railway.app/)  
- **Backend Endpoints:** [Postman Documentation](https://documenter.getpostman.com/view/16110894/2sB3HjMh2R)

---

## 🚀 Features

### ✅ Frontend (React + Tailwind + Vercel)
- Modern UI with **React Router** navigation.  
- Students listing with **pagination** for performance.  
- Upload student records (CSV/XLSX).  
- Update student info with **row-level update button** (disabled until changes are made).  
- Delete student records.  
- Error handling and toast notifications.  

### ✅ Backend (Node.js + Express + MongoDB + Railway)
- REST API for student data.  
- File upload with **Multer**.  
- CSV/XLSX parsing and storing records in MongoDB.  
- Pagination support in `/students` API.  
- CRUD endpoints for managing student records.  
- Separate uploads log with metadata.  

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, React Router  
- **Backend:** Node.js, Express, Multer  
- **Database:** MongoDB (Atlas)  
- **Deployment:**  
  - Frontend → [Vercel](https://vercel.com)  
  - Backend → [Railway](https://railway.app)  

---

## 📂 Project Structure

├── backend/ # Node.js + Express backend \
│ ├── index.js # App entry point \
│ ├── src/\
│ │ ├── controllers/ # API controllers\
│ │ ├── middlewares/ # Multer upload middleware\
│ │ ├── models/ # Mongoose models\
│ │ └── routes/ # Express routes\
│ └── utils/ # Utility functions (CSV/XLSX parsing)\
│\
├── frontend/ # React frontend\
│ ├── src/\
│ │ ├── components/ # UI components\
│ │ ├── pages/ # Page-level components\
│ │ └── App.js # React Router setup\
│ └── public/\
│\
├── package.json\
└── README.md


---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/033himanshu/Student-Management.git
cd Student-Management
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a ``.env`` file inside ``backend/``with:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
ORIGIN=https://student-management-kappa-khaki.vercel.app
```

run locally
```bash
npm start
```

API available at → http://localhost:5000/api

---
### 3. Frontend Setup

```bash
cd frontend
npm install
```
Create a .env file inside frontend/ with:
```
REACT_APP_API_BASE_URL=https://student-management-production-7532.up.railway.app/api
```
Run locally:
```bash
npm start
```
App runs on -> http://localhost:3000


## 👨‍💻 Author

[LinkedIn](https://www.linkedin.com/in/himanshu-upadhyay-851ab4200/)
[Github](https://github.com/033himanshu/)
