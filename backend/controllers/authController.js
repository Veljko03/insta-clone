const db = require("../db/authQueries");

//SIGN-IN
const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  if (!name || !email || !password) {
    res.status(400).json({ message: "Something missing" });
  }
  console.log("Raaaaaaa");

  const check = await db.getUserByEmail(email);
  console.log(check, " check");

  if (check > 0) {
    res.status.json({ message: "User allready exists" });
  }

  const newUser = await db.createNewUser(name, email, password);
  res.json(newUser);
};

module.exports = { createNewUser };
