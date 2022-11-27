const mongoose = require("Mongoose");

// define the Mongoose Scheme

const userSchema = new mongoose.schema({
  name: {
    type: String,
    reuired: true,
  },

  age: {
    type: Number,
    reuired: true,
  },
});

const User = mongoose.model("myUserSchema", userSchema);

module.export = User;
