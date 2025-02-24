import { useState } from "react";
import "./pages.css";
import { useOutletContext } from "react-router-dom";

const UsersPage = () => {
  const [findText, setFindText] = useState("");
  const [users, setUsers] = useState([]);
  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;
  const [token, user] = useOutletContext();

  const handleUsersSearch = (e) => {
    e.preventDefault();
    const userID = user.id;
    //treba pretraziti sve usere osim samog sebe

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
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  console.log(users.length);

  return (
    <div className="homeContainer">
      <form className="userSearchForm" onSubmit={handleUsersSearch} action="">
        <input
          type="text"
          minLength={1}
          value={findText}
          required
          onChange={(e) => setFindText(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="searchUsers">
        {users.length > 0 &&
          users.map((user) => {
            return (
              <div key={user.id} className="userS">
                <div className="userPic">pic</div>
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
