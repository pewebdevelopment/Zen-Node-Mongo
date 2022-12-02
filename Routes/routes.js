const router = require("express").Router();
const regSchema = require("../models/registrationSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

      const hashedPassword = await bcrypt.hash(password, 10);

      const addUser = new regSchema({
        username: username,
        email: email,
        pass: hashedPassword,
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

router.get("/getallusers", async (req, res) => {
  // destructuring req.body. Extracting the email & password of the current user who sent the request
  const { email, password } = req.body;

  const DBUser = await regSchema.findOne({ email: email }); // we can only send in findone, whatever we are sending in the body

  if (DBUser) {
    // match the passwords
    const matched = await bcrypt.compare(password, DBUser.pass);

    // both DBUSer.admin  should eb true and passwords should match
    if (DBUser.admin === true && matched) {
      try {
        const allUsers = await regSchema.find(); // gives us all users in the DB collection
        res.status(201).send(allUsers);
      } catch (err) {
        res.status(422).send(err);
        console.log("Err in retriving all Users:", err);
      }
    } else {
      if (!DBUser.admin) {
        res.status(422).json("User is not an Admin");
        console.log("User is not an Admin");
      } else {
        res.status(422).json("Password of the Admin user was incorrect");
        console.log("Password of the Admin user was incorrect");
      }
    }
  } else {
    res.status(422).json("Admin User not found");
    console.log("Admin User not found");
  }
});

router.post("/login", async (req, res) => {
  console.log("Login Route", req.body);
  //   res.status(200).json("Registration Successful");

  // destructuring req.body. Extracting the Email and password of the current user who sent the request
  const { email, password } = req.body;

  try {
    // checking if the request has everythign in it
    if (!email && !password) {
      res.status(403).send("Oops! Enter all information correctly");
    }

    const DBUser = await regSchema.findOne({ email: email });

    if (DBUser) {
      const matched = await bcrypt.compare(password, DBUser.pass);

      if (matched) {
        // This will give the entire document of the DB User including th ID
        //destructuring and removing pass and remaining info
        const { pass, ...info } = DBUser._doc;

        // We are creating the accessToken for the user to be able to navigate the server successfully with his identity
        // accessToken expires in 10 days
        const accessToken = jwt.sign(
          { id: DBUser.id, admin: DBUser.admin },
          process.env.SECRET_KEY,
          { expiresIn: "10d" }
        );
        res.status(200).send({ ...info, accessToken });
      } else {
        res.status(422).send("Email & Password did not match");
      }
    } else {
      console.log("User email does not exist");
      res.status(501).send("User email does not exist");
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(501).send(err);
  }
});

module.exports = router;
