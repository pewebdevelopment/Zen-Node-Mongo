const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./Routes/routes");

// The express app is now initialized
const app = express();

// TempPass = V4bzbPv49eJtNagD
dotenv.config(); // We have to run this config function once in the server
app.use(express.json());

mongoose
  .connect(process.env.MONGOURI)
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

// app.get("/home", (req, res) => {
//   res.send("HOME Page");
// });

// app.get("/about", (req, res) => {
//   res.send("About Page");
// });

app.use("/api", router);

// start our server
app.listen(8080, () => {
  console.log("Server is on Port: 8080");
});
