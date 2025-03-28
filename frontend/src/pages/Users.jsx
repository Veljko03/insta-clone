import { useState } from "react";
import "./pages.css";
import { useNavigate, useOutletContext } from "react-router-dom";

const UsersPage = () => {
  const [findText, setFindText] = useState("");
  const [users, setUsers] = useState([]);
  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;
  const [token] = useOutletContext();
  const navigate = useNavigate();

  const handleUsersSearch = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/user`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ findText: findText }),
    })
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setUsers(data);
          console.log(data);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  console.log(users.length);

  return (
    <div className="homeContainer">
      <div className="goBack">
        <button className="backBtn" onClick={() => navigate("/")}>
          Go back
        </button>
      </div>
      <form className="userSearchForm" onSubmit={handleUsersSearch} action="">
        <input
          type="text"
          minLength={1}
          value={findText}
          required
          placeholder="Search some user..."
          onChange={(e) => setFindText(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="searchUsers">
        {users.length > 0 &&
          users.map((user) => {
            return (
              <div
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                className="userS"
              >
                <div className="ImageContainer">
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt="Profile"
                      className="commImage"
                    />
                  ) : (
                    <div className="noImageText">
                      <p>No Image</p>
                    </div>
                  )}
                </div>
                <div className="nameAndMail">
                  <p>@{user.username} </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UsersPage;
