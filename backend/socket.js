const { Server } = require("socket.io");
const dotenv = require("dotenv");
const { sendMessage } = require("./db/messageQueries");
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.URL,
    },
  });
  io.on("connection", (socket) => {
    socket.on("chat-message", (msg) => {
      try {
        //poslati msg u bazu tj kreirati poruku
        const content = msg.msg;
        const sender = msg.sender;
        const reciever = msg.reciver;
        console.log(msg);

        sendMessage(content, sender, reciever);
      } catch (error) {}
    });
  });

  return io;
};

module.exports = initializeSocket;
