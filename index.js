const express = require("Express");

const mongoose = require("Mongoose");

const app = express();

// V4bzbPv49eJtNagD

mongoose
  .connect(
    "mongodb+srv://zenithphysics:V4bzbPv49eJtNagD@cluster0.8lmulno.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Connection Succesful");
  })
  .catch((err) => {
    console.log("Database Conn Error:", err);
  })
  .finally();

app.get("/", (req, res) => {
  res.send("Server Root Dir");
});

app.get("/home", (req, res) => {
  res.send("HOME Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

// start our server
app.listen(8080, () => {
  console.log("Server is on Port: 8080");
});
