# 📚 Book Review REST API

A RESTful API built using Node.js, Express, and MySQL for managing books and user-submitted reviews with JWT-based authentication.

---

## ✅ Project Setup Instructions

1. **Clone the repository**
   
   git clone https://github.com/Shivjagtap17/Book-Review-REST-API.git
   cd Book-Review-REST-API

2. **Install Dependencies**

   npm install  

3. **Configure environment variables**
   Create a .env file in the root directory:
   PORT=3000  
   DB_HOST=localhost  
   DB_USER=root  
   DB_PASSWORD=yourpassword  
   DB_NAME=book_review_db  
   JWT_SECRET=your_jwt_secret  

4. **Set up database and tables**

  node db.js  

5. **Start the server**

   node index.js  

 ## 🖥️ How to Run Locally
   
  . Ensure MySQL server is running
  
  . Run node db.js once to create the database and tables
  
  . Start the API with node index.js
  
  . Test using Postman or curl at: http://localhost:3000


## 🔌 Example API Requests

✅ **User Signup**
   curl -X POST http://localhost:3000/api/signup \  
   -H "Content-Type: application/json" \  
   -d '{"username":"john", "password":"pass123"}'  

✅ **User Login**
   curl -X POST http://localhost:3000/api/login \  
   -H "Content-Type: application/json" \  
   -d '{"username":"john", "password":"pass123"}'  

✅ **Add a Book**
   curl -X POST http://localhost:3000/api/books \  
   -H "Authorization: Bearer <TOKEN>" \  
   -H "Content-Type: application/json" \  
   -d '{"title":"Book Title", "author":"Author", "genre":"Genre"}'  

✅ **Submit a Review**
   curl -X POST http://localhost:3000/api/books/1/reviews \  
   -H "Authorization: Bearer <TOKEN>" \  
   -H "Content-Type: application/json" \  
   -d '{"rating":5, "comment":"Great read!"}'  


## 💡 Design Decisions & Assumptions

    🔒 JWT-based stateless authentication
   
   🧑 One review per user per book (enforced via unique constraint)
   
   🔄 Users can update or delete only their own reviews
   
   📚 Search by title or author supports partial/case-insensitive matching
   
   📖 Books and reviews include pagination for scalability
   
   📁 Project follows modular MVC structure for maintainability
   
   🛡️ Passwords are securely hashed using bcrypt


## 📂 Folder Structure

   .
├── controllers/
├── routes/
├── middlewares/
├── models/
├── db.js
├── index.js
├── .env
└── README.md







   
