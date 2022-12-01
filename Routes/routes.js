const router = require("express").Router();
const regSchema = require("../models/registrationSchema");
const jwt = require("jsonwebtoken");
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
    console.log("Before registeredUser");

    // regSchema.findOne;

    const registeredUser = await regSchema.findOne({ email: email });

    if (registeredUser) {
      res.status(422).json("Email already exists");
    } else {
      console.log("inside else block");

      const addUser = new regSchema({
        username: username,
        email: email,
        pass: jwt.encrypt(password, process.env.SECRETKEY),
      });

      const newUser = await addUser.save(); // this creates a new collection as per the Mongood, MongoDB Documentation
      // res.status(422).json("The following User is Registered:");
      res.status(201).send(newUser);
    }
  } catch (err) {
    console.log("Error:", err);
  }
});

router.put("/register/:id", async (req, res) => {
  console.log("Registeration Route PUT Req", req.body);
  const { username, email, password } = req.body;

  const id = req.params.id;
  console.log(id);

  try {
    // checking if the request has everythign in it
    if (!username && !email && !password) {
      res.status(403).json("Enter all data correctly");
    }

    const ourDBUser = await regSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // new:true means we are wanting to update this

    res.status(201).send(ourDBUser);
  } catch (err) {
    console.log("Error during Updating:", err);
    res.status(422).send(err);
  }
});

router.delete("/register/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await regSchema.findByIdAndDelete({ _id: id });
    // _id is the syntax for matching the ID in the DB

    res.status(201).send("User successfully deleted");
  } catch (err) {
    console.log("Error during Updating:", err);
    res.status(422).send(err);
  }
});

router.get("/register", async (req, res) => {
  // const allusers;

  try {
    const allUsers = await regSchema.find(); // gives us all users in the DB collection
    res.status(201).send(allUsers);
  } catch (err) {
    res.status(422).send(err);
    console.log("Err in retriving all Users:", err);
  }
});

module.exports = router;
