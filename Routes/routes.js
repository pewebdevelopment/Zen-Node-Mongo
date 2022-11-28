const router = require("Express").Router();
const regSchema = require("../models/registrationSchema");

// router.post();

router.post("/register", async (req, res) => {
  console.log("Registeration Route", req.body);
  //   res.status(200).json("Registration Successful");

  // destructuring req.body
  const { username, email, password } = req.body;

  if (username && email && password) {
    try {
      // saving data inside database data

      // check if a user with the same email Id is already present in the DB
      const registeredUser = await regSchema.findOne({ email: email });

      if (registeredUser) {
        res.status(422).json("Email already exists");
      } else {
        const addUser = new regSchema({
          usernmae: username,
          email: email,
          pass: password,
        });

        await addUser.save();

        res.status(201).json("User Registration Successful");
      }
    } catch {}
  } else {
    res.status(403).json("Enter all data correctly");
  }

  //   await res;
});

module.exports = router;
