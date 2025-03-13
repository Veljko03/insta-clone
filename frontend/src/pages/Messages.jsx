import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { socket } from "../socket";
import { useEffect, useRef, useState } from "react";
import "./chat.css";
const MessagesPage = () => {
  const [msgText, setMsgTxt] = useState("");
  const [token, user] = useOutletContext();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const listRef = useRef(null);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);
  useEffect(() => {
    const handleChatMessage = (mess) => {
      console.log(mess);
      setMessages((prevMessages) => [...prevMessages, mess]);
    };

    socket.on("chat-message", handleChatMessage);

    return () => {
      socket.off("chat-message", handleChatMessage);
    };
  }, []);
  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;

  useEffect(() => {
    const loadMessages = () => {
      socket.emit("load-messages", {
        senderId: user.id,
        receiverId: params.id,
      });
    };
    fetch(`${API_URL}/user/${params.id}`, {
      method: "get",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setProfile(data);
      })
      .catch((error) => console.log(error));
    loadMessages();

    socket.on("load-messages", (messages) => {
      setMessages(messages);
    });
    fetch(``);

    return () => {
      socket.off("load-messages");
    };
  }, [user.id, params.id]);

  const sendMessage = (e) => {
    e.preventDefault();
    const userId = user.id;
    const reiverId = params.id;
    const message = { msg: msgText, sender: userId, reciver: reiverId };

    socket.emit("chat-message", message);

    setMsgTxt("");
  };

  if (!profile) return <h1>User Missing</h1>;
  console.log(profile);

  return (
    <div className="msg">
      <div className="topMessagePart">
        <button
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "0",
            color: "black",
          }}
          onClick={() => navigate("/chat")}
        >
          Go back
        </button>
        <p className="uname">{profile.username}</p>
      </div>
      <div className="messagesContainer">
        <div className="messages">
          <ul className="messageList" ref={listRef}>
            {messages.map((msg, index) => (
              <li
                key={index}
                className={
                  msg.sender_id === user.id
                    ? "message sent"
                    : "message received"
                }
              >
                <span className="username">{msg.sender_name}</span>
                <p className="messageContent">{msg.content}</p>
                <small className="timestamp">{msg.created_At}</small>
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
