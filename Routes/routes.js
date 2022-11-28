const router = require("Express").Router();
const regSchema = require("../models/registrationSchema");

// router.post();

router.post("/register", async (req, res) => {
  console.log("Registeration Route", req.body);
  //   res.status(200).json("Registration Successful");

  // destructuring req.body
  const { username, email, password } = req.body;

  try {
    // checking if the request has everythign in it
    if (!username && !email && !password) {
      res.status(403).json("Enter all data correctly");
    }

    // saving data inside database data

    // check if a user with the same email Id is already present in the DB
    console.log("Before registeredUser User");

    // regSchema.findOne;

    const registeredUser = await regSchema.findOne({ email: email });

    if (registeredUser) {
      res.status(422).json("Email already exists");
    } else {
      console.log("inside else block");

      const addUser = new regSchema({
        username: username,
        email: email,
        pass: password,
      });

      await addUser.save();

      res.status(201).json("User Registration Successful");
    }
  } catch (err) {
    console.log("Error:", err);
  }
});

module.exports = router;
