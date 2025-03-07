import { useState } from "react";
import "./chat.css";
import { useNavigate, useOutletContext } from "react-router-dom";
const ChatPage = () => {
  //const [token, user] = useOutletContext();
  const [conversations, setConversations] = useState(null);
  const navigate = useNavigate();

  if (!conversations)
    return (
      <h1
        style={{
          justifySelf: "center",
          alignSelf: "center",
          marginLeft: "22rem",
        }}
      >
        Click chat on users profile to start convesation
      </h1>
    );
  return (
    <div className="chatContainer">
      {conversations.map((conv) => (
        <div key={conv.id} className="conv" onClick={() => navigate("/chat/2")}>
          raaaaaa
        </div>
      ))}
    </div>
  );
};

export default ChatPage;
