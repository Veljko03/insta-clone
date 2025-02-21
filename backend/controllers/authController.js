const db = require("../db/authQueries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//SIGN-IN
const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Something missing" });
  }
  console.log("Raaaaaaa");

  const check = await db.getUserByEmail(email);

  if (check != null) {
    res.status.json({ message: "User allready exists" });
    return;
  }

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) return;

    const newUser = await db.createNewUser(name, email, hashedPassword);
    res.json(newUser);
  });
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Something missing" });
  }

  const user = await db.getUserByEmail(email);
  if (!user) {
    res.status(400).json({ message: "Email or password are wrong" });
  }
  console.log(user, " userrr");

  const validatePassword = await bcrypt.compare(password, user.password_hash);
  if (!validatePassword) {
    res.status(400).json({ message: "Email or password are wrong" });
  }

  const token = jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  const result = { token, user };
  res.json(result);
};

module.exports = { createNewUser, logIn };
