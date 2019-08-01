const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const compression = require("compression");
const passport = require("passport");
const morgan = require("morgan");

const meals = require("./routes/api/meals");
const users = require("./routes/api/users");
const recipes = require("./routes/api/recipes");

const app = express();

// gzip compression middleware
app.use(compression());

// body-parser middleware
app.use(bodyParser.json());

// cookie-parser middleware
app.use(cookieParser());

// configure db
const db = require("./config/keys").mongoURI;

// connect to db
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Set headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// set port
const port = process.env.PORT || 5000;

// Passport Config
require("./config/passport")(passport);
app.use(passport.initialize());

// use routes
app.use("/api/meals", meals);
app.use("/api/users", users);
app.use("/api/recipes", recipes);

app.use("/public", express.static("public"));

// serve static assests if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//handle 404
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

// start server
app.listen(port, () => console.log(`Server starting on port ${port}`));
