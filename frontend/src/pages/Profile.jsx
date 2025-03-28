import { useEffect, useState } from "react";
import "./pages.css";
import { useOutletContext, useNavigate } from "react-router-dom";
import Post from "../components/Post";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [token, user] = useOutletContext();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [photo, setPhoto] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;
  const [biography, setBiography] = useState("No biography...");
  const [isEditing, setIsEditing] = useState(false);
  const [tempBiography, setTempBiography] = useState(biography);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!profile) return;

    if (!profile.biography || profile.biography === "No biography...") {
      setBiography("No biography...");
    } else {
      setBiography(profile.biography);
    }
  }, [profile]);
  const handleEditClick = () => {
    setTempBiography(biography);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    //setBiography(tempBiography);

    const toSend = { userId: user.id, bio: tempBiography };
    fetch(`${API_URL}/user/updateBio`, {
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
          setBiography(data.biography);
        }
      })
      .catch((err) => {
        alert(err.message);
      });

    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "testtest");
    formData.append("folder", "posts");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dy2sfn7zd/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      return data.secure_url; // Vraća URL slike
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
      return null;
    }
  };
  const uploadPicture = async (e) => {
    e.preventDefault();
    if (!photo) {
      alert("choose a photo first");
      return;
    }
    setIsLoading(true);

    let photoPath = null;

    if (photo) {
      photoPath = await uploadImage(photo);
      if (!photoPath) return;
    }
    const userID = user.id;
    const toSend = { photo: photoPath, userId: userID };
    fetch(`${API_URL}/user/updatePicture`, {
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
          setRerender((prev) => !prev);
        }
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!token) return;
    const id = user.id;
    fetch(`${API_URL}/user/${id}`, {
      method: "get",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // localStorage.setItem("user", JSON.stringify(data));
        setProfile(data);
      })
      .catch((error) => console.log(error));

    fetch(`${API_URL}/profile`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.log(error));
  }, [token, user, rerender]);

  const handleLikePost = (postId, event) => {
    event.stopPropagation();

    if (!token || !postId || !user) return;
    const userID = user.id;

    fetch(`${API_URL}/post/like`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: userID, postId: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRerender((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };
  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profileCon">
      <div className="goBack">
        <button className="backBtn" onClick={() => navigate("/")}>
          Go back
        </button>
      </div>
      <div className="profile">
        <div className="picAndFollow">
          <div className="profilePictureContainer">
            {profile.profile_image ? (
              <img
                src={profile.profile_image}
                alt="Profile"
                className="profilePicture"
              />
            ) : (
              <div className="emptyProfilePicture">
                <p>No Image</p>
              </div>
            )}
          </div>
          <div className="choseUpload">
            <input
              type="file"
              accept="image/png, image/jpeg"
              disabled={isLoading}
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            <button
              disabled={isLoading}
              className="uploadButton"
              onClick={uploadPicture}
            >
              Upload Picture
            </button>
          </div>
          {isLoading && (
            <h1
              style={{ padding: "30px", color: "red", fontSize: "24px" }}
            ></h1>
          )}
          <div className="followers">
            <div className="profileName">{profile.username}</div>
            <div className="f">
              <div className="fCon1">
                <p>{profile.followers}</p>
                <p>Followers</p>
              </div>
              <div className="fCon1">
                <p>{profile.following}</p>
                <p>Following</p>
              </div>
              <div className="fCon1">
                <p>{posts.length}</p>
                <p>Posts</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bio">
          {isEditing ? (
            <div>
              <textarea
                className="bioInput"
                value={tempBiography}
                onChange={(e) => setTempBiography(e.target.value)}
                rows="4"
                cols="50"
                minLength={1}
              />
              <div className="bioBtns">
                <button className="updateBtn1" onClick={handleSaveClick}>
                  Save
                </button>
                <button className="updateBtn2" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <textarea
                disabled={true}
                value={biography}
                style={{ fontSize: "20px", color: "white", border: "0" }}
              ></textarea>
              <button className="changeBio" onClick={handleEditClick}>
                Change Biography
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} handleClick={handleLikePost} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
