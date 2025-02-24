const db = require("../db/authQueries");
const userDb = require("../db/usersQueries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passport = require("passport");
//SIGN-IN
const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "Something missing" });
      return;
    }
    console.log("Raaaaaaa");

    const check = await userDb.getUserByEmail(email);

    if (check != null) {
      res.status.json({ message: "User allready exists" });
      return;
    }

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) return;

      const newUser = await db.createNewUser(name, email, hashedPassword);
      res.json(newUser);
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "Something missing" });
      return;
    }

    const user = await userDb.getUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: "Email or password are wrong" });
      return;
    }

    const validatePassword = await bcrypt.compare(password, user.password_hash);
    if (!validatePassword) {
      res.status(400).json({ message: "Email or password are wrong" });
      return;
    }

    const token = jwt.sign({ user }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    const result = { token, user };
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

module.exports = { createNewUser, logIn };
