import { useState } from "react";
import "./pages.css";
import { useOutletContext, useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;
  const [token, user, supabase] = useOutletContext();
  const navigate = useNavigate();

  const uploadImage = async (file) => {
    try {
      console.log(file);
      if (!user) return;
      const fileName = `${Date.now()}_${file.name}`;

      const { data, error } = await supabase.storage
        .from("pics")
        .upload(user.id + "/" + file.name, file);

      if (error) throw error;
      console.log("Uploaded image:", data);
      return data.path; // Vraća putanju slike
    } catch (error) {
      console.error("Image upload failed:", error.message);
      alert("Failed to upload image.");
      return null;
    }
  };

  const handlePostAdd = async (e) => {
    e.preventDefault();
    if (content == "") {
      alert("Please type something first");
    }
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
      });
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
          placeholder="Share your toughts..."
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePage;
