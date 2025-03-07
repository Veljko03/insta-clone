import { useNavigate, useOutletContext } from "react-router-dom";
import { socket } from "../socket";
import { useState } from "react";
import "./chat.css";
const MessagesPage = () => {
  const [msgText, setMsgTxt] = useState("");
  const [token, user] = useOutletContext();
  const [messages, setMessages] = useState(null);
  const navigate = useNavigate();

  const sendMessage = (e) => {
    e.preventDefault();
    // const userId = user.id;
    // const message = { sender: userId, reciver: 3, msg: msgText };
    // socket.emit("chat-message", message);
    // console.log("prosao");

    // setMsgTxt("");
  };

  return (
    <div className="msg">
      <div className="topMessagePart">
        <button onClick={() => navigate("/chat")}>Go back</button>
        <p>USERRRRRRRR</p>
      </div>
      <div className="messagesContainer">
        <div className="messages">
          <ul
            className="messageList"
            // ref={listRef}
          >
            {messages?.map((msg, index) => (
              <li
                key={index}
                className={
                  msg.username === user.userName
                    ? "message sent"
                    : "message received"
                }
              >
                <span className="username">{msg.username}</span>
                <p className="messageContent">{msg.content}</p>
                <small className="timestamp">{msg.timestamp}</small>
              </li>
            ))}
          </ul>
        </div>

        <div className="sendMessage">
          <form className="messageForm" onSubmit={sendMessage}>
            <textarea
              className="messageInput"
              value={msgText}
              onChange={(e) => setMsgTxt(e.target.value)}
              required
              placeholder="Type your message..."
              minLength={1}
            ></textarea>
            <button className="sendButton" type="submit">
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
