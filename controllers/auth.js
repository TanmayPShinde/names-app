const User = require("../models/person.js");
const bycrypt = require("bcryptjs");
const jwt = require("jwt-simple");

async function signup(req, res) {
  //   const salt = await bycrypt.genSalt(10);
  //   hashpassword = await bycrypt.hash(req.body.password, salt);
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    res.status(400).json({ error: "Email already Exist" });
  }
  const user = new User({
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const userSignup = await user.save();
    const payload = {
      user: {
        id: userSignup.id,
      },
    };
    var token = jwt.encode(payload, "anystring");
    console.log(token);
    res.status(200).json({
      token,
      userSignup,
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

//Login Controller
async function login(req, res) {
  const emailExist = await User.findOne(
    { email: req.body.email },
    { password: 1, _id: 1 }
  );
  if (!emailExist) {
    res.status(400).json({ error: "Email not Found" });
  }
  //   console.log(emailExist);
  const checkpassword = await bycrypt.compare(
    req.body.password,
    emailExist.password
  );
  if (!checkpassword) {
    res.status(400).json({ error: "Password mismatch" });
  }
  const token = jwt.encode({ id: emailExist._id }, "anystring");
  res.header("auth-token", token).json({ Token: token });
}

module.exports = {
  signup,
  login,
};
