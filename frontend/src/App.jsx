import { Outlet } from "react-router-dom";
import "./index.css";
import SideBar from "./Sidebar";
function App() {
  return (
    <div className="appContainer">
      <div className="header">
        <div className="titile">Insta Clone</div>
        <div className="porfilePic">profile pic</div>
      </div>
      <div className="content">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
