const mongoose = require("Mongoose");

const registrationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  pass: {
    type: String,
    required: true,
  },
});

const regSchema = new mongoose.model("registrationSchema", registrationSchema);
// "registrationSchema" is the name of the mongodb tables

module.export = regSchema;
