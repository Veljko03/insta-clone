import { useEffect, useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import Post from "../components/Post";
import "./pages.css";
const UserByIdPage = () => {
  const { id } = useParams();
  const [token, user] = useOutletContext();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [followingTxt, setFollowingTxt] = useState("follow");

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;

  useEffect(() => {
    if (!token) return;

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
        console.log(data);

        setPosts(data);
      })
      .catch((error) => console.log(error));
  }, [token, user, rerender]);

  useEffect(() => {
    if (user && profile) {
      const followerId = user.id;
      const followingId = profile.id;
      console.log("usao");

      fetch(`${API_URL}/user/isFollowing`, {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          followerId: followerId,
          followingId: followingId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data == 1) {
            setFollowingTxt("Unfollow");
          } else {
            setFollowingTxt("Follow");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [profile]);

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
        console.log(data);
        setRerender((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };

  const handleFollow = () => {
    if (!user || !profile) {
      alert("something missing");
      return;
    }

    const followerId = user.id;
    const followingId = profile.id;

    fetch(`${API_URL}/user/follow`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        followerId: followerId,
        followingId: followingId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == "unfollowed") {
          setFollowingTxt("follow");
        } else {
          setFollowingTxt("Unfollow");
        }
        setRerender((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };
  if (!profile) return <p>Loading...</p>;
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
          {profile.profile_image ? (
            <img
              src={profile.profile_image}
              alt="Profile"
              className="profilePicture"
              style={{ height: "100px", width: "100px", border: "40px" }}
            />
          ) : (
            <div className="emptyProfilePicture">
              <p>No Image</p>
            </div>
          )}{" "}
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
            <div className="followAndChat">
              <button className="followBtn" onClick={handleFollow}>
                {followingTxt}
              </button>
              <button
                className="chatBtn"
                onClick={() => navigate(`/chat/${profile.id}`)}
              >
                Chat
              </button>
            </div>
          </div>
        </div>
        <div className="bio">
          <p>{profile.biography}aaaaaaaaa</p>
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

export default UserByIdPage;
