import { useEffect, useState } from "react";
import "./pages.css";
import { useOutletContext, useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;
  const [isLoading, setIsLoading] = useState(false);

  const [token, user] = useOutletContext();
  const navigate = useNavigate();

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "testtest"); // Tvoj preset
    formData.append("folder", "posts");
    try {
      const response = await fetch(
        "     https://api.cloudinary.com/v1_1/dy2sfn7zd/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);

      return data.secure_url; // Vraća URL slike
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
      return null;
    }
  };

  const handlePostAdd = async (e) => {
    e.preventDefault();
    if (content == "") {
      alert("Please type something first");
    }
    setIsLoading(true);
    const userID = user.id;

    let photoPath = null;

    if (photo) {
      photoPath = await uploadImage(photo);
      if (!photoPath) return;
    }
    console.log("photo path", photoPath);

    const toSend = { content, photo: photoPath, userID };
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
          setPhoto(null);
        }
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="homeContainer">
      <div className="goBack">
        <button className="backBtn" onClick={() => navigate("/")}>
          Go back
        </button>
      </div>
      <form className="postForm" action="" onSubmit={handlePostAdd}>
        <textarea
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          disabled={isLoading}
          placeholder="Share your toughts..."
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          disabled={isLoading}
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button type="submit">Post</button>
      </form>
      {isLoading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default CreatePage;
