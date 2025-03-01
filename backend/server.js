// Load Database access values as Environment Variables
const Dotenv = require("dotenv");
const dotenvConfig = Dotenv.config();
if (dotenvConfig.error) console.log(dotenvConfig.error);
console.log(process.env);

// Set-up Express Server
// const express = require("express");
// const app = express();
// const port  = process.env.REACTMDB_EXPPORT || 3000;



