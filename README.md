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

6. **🖥️ How to Run Locally**
   
  . Ensure MySQL server is running
  . Run node db.js once to create the database and tables
  . Start the API with node index.js
  . Test using Postman or curl at: http://localhost:3000


   
