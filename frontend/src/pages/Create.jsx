import { useState } from "react";
import "./pages.css";

const CreatePage = () => {
  const [postText, setPostText] = useState("");

  const handlePostAdd = () => {};
  return (
    <div className="homeContainer">
      <form className="postForm" action="" onSubmit={handlePostAdd}>
        <textarea
          type="text"
          onChange={(e) => setPostText(e.target.value)}
          value={postText}
          placeholder="Share your toughts..."
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePage;
