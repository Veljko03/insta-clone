import { useEffect, useState } from "react";
import "./pages.css";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [token, user] = useOutletContext();
  const [profile, setProfile] = useState(null);

  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;
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
        console.log(data);

        setProfile(data);
      })
      .catch((error) => console.log(error));
  }, []);
  if (!profile) return;
  console.log(profile);

  return (
    <div className="profileCon">
      <div className="goBack">
        <button className="backBtn" onClick={() => navigate("/")}>
          Go back
        </button>
      </div>
      <div className="profile">
        <div className="picAndFollow">
          <h2>img</h2>
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
                <p>0</p>
                <p>Posts</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bio">
          <p>{profile.biography}aaaaaaaaa</p>
        </div>
      </div>
      <div className="posts"></div>
    </div>
  );
};

export default ProfilePage;
