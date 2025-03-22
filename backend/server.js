// Load Database access values as Environment Variables
const Dotenv = require("dotenv");
const dotenvConfig = Dotenv.config();
if (dotenvConfig.error) console.log(dotenvConfig.error);
// console.log(process.env);

// Set-up Express Server with CORS
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.REACTMDB_EXPPORT || 3000;

// Allow JSON POST requests to Express Server & Setup CORS
app.use(express.json());
app.use(cors());

// Set-up Database Connection
const mariadb = require("mariadb/callback");
const conn = mariadb.createConnection({
  host: process.env.REACTMDB_HOST,
  user: process.env.REACTMDB_USER,
  password: process.env.REACTMDB_PASSWORD,
  database: process.env.REACTMDB_DATABASE
});

// Home page
app.get("/", (req, res) => {
  res.json("Hello - This is the backend");
});

// List all Books
app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  conn.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Add Book
app.post("/books", (req, res) => {
  const sql = "INSERT INTO books (`Title`, `Description`, `CoverFilename`) VALUES (?)";
  // const values = ["myTitle3", "myDesc3", "myFilename3"];
  const values = [
    req.body.title,
    req.body.description,
    req.body.coverFilename
  ];
  conn.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    // console.log(data);
    return res.json("Book has been added successfully.");
  });
});

// Start Express Server
app.listen(port, () => {
  console.log(`Connected to backend on port: ${port}...`);
});



