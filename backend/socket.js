const { Server } = require("socket.io");
const dotenv = require("dotenv");
const {
  sendMessage,
  getMessages,
  getMessagesById,
} = require("./db/messageQueries");
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
  io.on("connection", async (socket) => {
    socket.on("chat-message", async (msg) => {
      let result;
      try {
        //poslati msg u bazu tj kreirati poruku
        const content = msg.msg;
        const sender = msg.sender;
        const reciever = msg.reciver;

        const m = await sendMessage(content, sender, reciever);
        result = await getMessagesById(m.id);
      } catch (error) {
        console.error("Error sending message:", error);
      }
      io.emit("chat-message", result);
    });
    socket.on("load-messages", async ({ senderId, receiverId }) => {
      try {
        // Preuzmi poruke iz baze između dva korisnika
        const messages = await getMessages(senderId, receiverId);
        // Pošalji poruke nazad klijentu
        socket.emit("load-messages", messages);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    });
  });

  return io;
};

module.exports = initializeSocket;
