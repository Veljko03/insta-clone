const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

//REGISTER
authRouter.post("/sign-in", authController.createNewUser);

//LOGIN
//authRouter.post("/log-in");

module.exports = authRouter;
