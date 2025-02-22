import { useState } from "react";
import "./pages.css";
import { useOutletContext, useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;
  const [token, user] = useOutletContext();
  const navigate = useNavigate();
  const handlePostAdd = (e) => {
    e.preventDefault();
    if (content == "") {
      alert("Please type something first");
    }
    const userID = user.id;
    const toSend = { content, photo, userID };
    fetch(`${API_URL}/post`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(toSend),
    })
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setContent("");
          navigate("/");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="homeContainer">
      <form className="postForm" action="" onSubmit={handlePostAdd}>
        <textarea
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Share your toughts..."
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePage;
