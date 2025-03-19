const express = require("express");
const initializeSocket = require("./socket");
const cors = require("cors");
const { createServer } = require("node:http");
const app = express();
const dotenv = require("dotenv");

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });
require("./cofing/passpoer");
const { authRouter, userRouter, postRouter } = require("./routes/index");

const server = createServer(app);
initializeSocket(server);
const corsOptions = {
  origin: process.env.URL, // tvoj frontend domen
  methods: "GET,POST",
  allowedHeaders: "Content-Type, Authorization",
};
app.get("/health-check", (req, res) => {
  res.status(200).json({ status: "Server is awake" });
});
app.use(express.json());
app.use(cors(corsOptions));
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/", postRouter);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("app running on port 3000"));
