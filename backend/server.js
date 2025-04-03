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
  const sql = "INSERT INTO books (`Title`, `Description`, `CoverFilename`, `Price`) VALUES (?)";
  // const values = ["Backend Title", "Backend Desription", "BackendFilename.jpg", "9.99"];
  const values = [
    req.body.title,
    req.body.description,
    req.body.coverFilename,
    req.body.price
  ];
  conn.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    // console.log(data);
    return res.json("Book has been added successfully.");
  });
});

// Delete Book
app.delete("/books/:id", (req, res) => {
  const bookID = req.params.id;
  const sql = "DELETE FROM books WHERE BookID = ?";
  conn.query(sql, [bookID], (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json("Book has been deleted successfully.");
  });
});

// Update Book
app.put("/books/:id", (req, res) => {
  const bookID = req.params.id;
  const sql = "UPDATE books SET `Title` = ?, `Description` = ?, `CoverFilename` = ?, `Price` = ? WHERE BookID = ?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.coverFilename,
    req.body.price,
  ];
  conn.query(sql, [...values, bookID], (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json("Book has been updated successfully.");
  });
});


// Start Express Server
app.listen(port, () => {
  console.log(`Connected to backend on port: ${port}...`);
});



