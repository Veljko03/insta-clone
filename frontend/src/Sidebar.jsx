import { Link } from "react-router-dom";

const SideBar = () => {
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
        <Link to={"/"}>Messages</Link>
      </div>
      <div className="iconName">
        {" "}
        <Link to={"/liked-posts"}>Likes</Link>
      </div>
      <div className="iconName">
        {" "}
        <Link to={"/"}>Profile</Link>
      </div>
      <div className="iconName">
        {" "}
        <Link to={"/"}>Settings</Link>
      </div>
    </div>
  );
};

export default SideBar;
