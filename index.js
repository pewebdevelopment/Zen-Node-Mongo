const express = require("Express");

const Mongoose = require("Mongoose");

const App = express();

App.listen(8080, () => {
  console.log("Server is on Port: 8080");
});

// start our server
