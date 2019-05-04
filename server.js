const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");

const meals = require("./routes/api/meals");

const app = express();

// gzip compression middleware
app.use(compression());

// body-parser middleware
app.use(bodyParser.json());

// configure db
const db = require("./config/keys").mongoURI;

// connect to db
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// use routes
app.use("/api/meals", meals);

// serve static assests if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// set port
const port = process.env.PORT || 5000;

//handle 404
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

// start server
app.listen(port, () => console.log(`Server starting on port ${port}`));
