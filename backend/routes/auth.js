const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

//REGISTER
authRouter.post("/sign-in", authController.createNewUser);

//LOGIN
authRouter.post("/log-in", authController.logIn);

module.exports = authRouter;
