const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./Routes/routes");
const errMiddleware = require("./Middleware/errorMiddleware");
const cors = require("cors");

// The express app is now initialized
const app = express();

app.use(cors());
// TempPass = V4bzbPv49eJtNagD
dotenv.config(); // We have to run this config function once in the server to make our .env file data accessible
app.use(express.json());

mongoose
  .connect(process.env.MONGOLocalURI)
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

app.use(errMiddleware); // using the middleware
// app.use(otherMiddleware); // for using any other middleware apart frrom errMiddleware

// start our server
app.listen(8080, () => {
  console.log("Server is on Port: 8080");
});
