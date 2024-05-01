const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('data.db');

// Parse JSON bodies
app.use(bodyParser.json());

// Allow requests from all origins (replace '*' with the specific origin of your frontend)
app.use(cors());

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    review TEXT
)`);

// Handle POST request to store data
app.post('/data', (req, res) => {
    const { name, email, review } = req.body;
    db.run('INSERT INTO data (name, email, review) VALUES (?, ?, ?)', [name, email, review], (err) => {
        if (err) {
            res.status(500).send('Error storing data');
        } else {
            res.status(201).send('Data stored successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
