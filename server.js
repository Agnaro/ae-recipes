const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// body-parser middleware
app.use(bodyParser.json());

// configure db

// connect to db

// use routes

// serve static assests if in production

// set port
const port = process.env.PORT || 5000;

// start server
app.listen(port, () => console.log(`Server starting on port ${port}`));
