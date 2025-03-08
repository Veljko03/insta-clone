import { useEffect, useState } from "react";
import "./chat.css";
import { useNavigate, useOutletContext } from "react-router-dom";
const ChatPage = () => {
  const [token, user] = useOutletContext();
  const [conversations, setConversations] = useState(null);
  const [allMessages, setAllMessages] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;

  useEffect(() => {
    if (allMessages && user) {
      let uniqueUser = [];
      const currUserId = user.id;
      let newArr = [];
      console.log("Rad");

      allMessages.forEach((element) => {
        if (element.sender_id == currUserId) {
          if (uniqueUser.includes(element.receiver_id)) return;
          uniqueUser.push(element.receiver_id);
          newArr.push(element);
        } else if (element.receiver_id == currUserId) {
          if (uniqueUser.includes(element.sender_id)) return;
          uniqueUser.push(element.sender_id);
          newArr.push(element);
        }
      });
      setConversations(newArr);
    }
  }, [allMessages, user]);

  useEffect(() => {
    if (!user) return;
    const id = user.id;
    fetch(`${API_URL}/chat/${id}`, {
      method: "get",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setAllMessages(data);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

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
  console.log(conversations);

  return (
    <div className="chatContainer">
      {conversations.map((chat) => (
        <div
          key={chat.message_id}
          className="cahtUser"
          onClick={() => navigate(`/chat/${chat.other_user_id}`)}
        >
          PIC
          <div className="nameContent">
            <p>{chat.username}</p>
            <p className="con">{chat.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatPage;
