import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.setItem("user", null);
    localStorage.setItem("token", null);

    navigate("/auth/log-in");
  };
  return (
    <div className="sidebarContainer">
      <div className="iconName">
        <Link to={"/"}>Home</Link>
      </div>
      <div className="iconName">
        <Link to={"/create"}>Create</Link>
      </div>
      <div className="iconName">
        {" "}
        <Link to={"/users"}>Users</Link>
      </div>
      <div className="iconName">
        {" "}
        <Link to={"/chat"}>Messages</Link>
      </div>
      <div className="iconName">
        {" "}
        <Link to={"/liked-posts"}>Likes</Link>
      </div>
      <div className="iconName">
        {" "}
        <Link to={"/view-profile"}>Profile</Link>
      </div>
      <div className="iconName">
        {" "}
        <Link onClick={logOut}>LogOut</Link>
      </div>
    </div>
  );
};

export default SideBar;
