const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Connect without selecting a database initially
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true //  Enable execution of multiple SQL statements
});

connection.connect((err) => {
  if (err) throw err;
  console.log(' Connected to MySQL');

  // Step 1: Create the database if not exists
  connection.query('CREATE DATABASE IF NOT EXISTS book_review_db', (err) => {
    if (err) throw err;
    console.log(' Database created or already exists');

    // Step 2: Switch to the new database
    connection.changeUser({ database: 'book_review_db' }, (err) => {
      if (err) throw err;
      console.log(' Using book_review_db');

      // Step 3: Create tables
      const createTables = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS books (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          author VARCHAR(255) NOT NULL,
          genre VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS reviews (
          id INT AUTO_INCREMENT PRIMARY KEY,
          book_id INT NOT NULL,
          user_id INT NOT NULL,
          rating INT CHECK (rating BETWEEN 1 AND 5),
          comment TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
          CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          UNIQUE (book_id, user_id)
        );
      `;

      connection.query(createTables, (err) => {
        if (err) throw err;
        console.log(' Tables created successfully');
        connection.end();
      });
    });
  });
});
