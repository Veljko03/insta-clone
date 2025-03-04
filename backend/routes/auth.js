const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const dotenv = require("dotenv");

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });
//REGISTER
authRouter.post("/sign-in", authController.createNewUser);

//LOGIN
authRouter.post("/log-in", authController.logIn);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    let encodedObject = encodeURIComponent(JSON.stringify(user));

    res.redirect(`${process.env.URL}/auth/log-in?user=${encodedObject}`);
  }
);

module.exports = authRouter;
