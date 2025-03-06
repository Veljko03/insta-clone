const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();
require("dotenv").config();
require("./cofing/passpoer");
const { authRouter, userRouter, postRouter } = require("./routes/index");
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.URL,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
});
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/", postRouter);

server.listen(3000, () => console.log("app running on port 3000"));
