const express = require("express");
const app = express();
require("dotenv").config();
const { authRouter, userRouter, postRouter } = require("./routes/index");
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/", postRouter);

app.listen(3000, () => console.log("app running on port 3000"));
