const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Endpoint for signing up
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const selectQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(selectQuery, [email], (err, results) => {
    if (err) {
      console.error('Error executing select query:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create a new user
    const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(insertQuery, [email, password], (err, _) => {
      if (err) {
        console.error('Error executing insert query:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      return res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Endpoint for signing in
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const selectQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(selectQuery, [email], (err, results) => {
    if (err) {
      console.error('Error executing select query:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0 || results[0].password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({ message: 'Sign in successful' });
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
