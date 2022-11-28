const express = require("express");

const mongoose = require("eongoose");

const router = require("./Routes/routes");

const app = express();

// TempPass = V4bzbPv49eJtNagD

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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Root Dir");
});

app.get("/home", (req, res) => {
  res.send("HOME Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.use(router);

// start our server
app.listen(8080, () => {
  console.log("Server is on Port: 8080");
});
