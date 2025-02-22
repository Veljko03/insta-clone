const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
//REGISTER
authRouter.post("/sign-in", authController.createNewUser);

//LOGIN
authRouter.post("/log-in", authController.logIn);

authRouter.get("/google", passport.authenticate("google"));

authRouter.get("/proteceted", (req, res) => res.send("protected"));

module.exports = authRouter;
