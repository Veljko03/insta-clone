const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./cofing/passpoer");
const { authRouter, userRouter, postRouter } = require("./routes/index");
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/", postRouter);

app.listen(3000, () => console.log("app running on port 3000"));
