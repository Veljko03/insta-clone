import "./chat.css";
const ChatPage = () => {
  return (
    <div className="chatContainer">
      <div className="chatUsers">list users here</div>
      <div className="chatMessages">
        <ul
          className="messageList"
          //ref={listRef}
        >
          {/* {messages.map((msg, index) => (
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
          ))} */}
          <li>dafsdsa</li>
          <li>fasdgas</li>
          <li>sada</li>
          <li>,ada</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatPage;
