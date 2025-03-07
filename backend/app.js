const express = require("express");
const initializeSocket = require("./socket");
const cors = require("cors");
const { createServer } = require("node:http");
const app = express();
require("dotenv").config();
require("./cofing/passpoer");
const { authRouter, userRouter, postRouter } = require("./routes/index");

const server = createServer(app);
initializeSocket(server);

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/", postRouter);

server.listen(3000, () => console.log("app running on port 3000"));
