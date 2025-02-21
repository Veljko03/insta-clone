const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
//REGISTER
authRouter.post("/sign-in", authController.createNewUser);

//LOGIN
authRouter.post("/log-in", authController.logIn);

authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/google/failure",
  })
);

module.exports = authRouter;
