const mongoose = require("mongoose");

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

  admin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("registrationSchema", registrationSchema);
// const regSchema = new mongoose.model("registrationSchema", registrationSchema);
// "registrationSchema" is the name of the mongodb tables

// module.exports = regSchema;
