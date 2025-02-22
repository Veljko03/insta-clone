import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import SideBar from "./Sidebar";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const sotredUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (sotredUser) {
      setUser(JSON.parse(sotredUser));
    } else {
      navigate("/auth/log-in");
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  if (!user || !token) return null;
  return (
    <div className="appContainer">
      <div className="header">
        <div className="titile">Insta Clone</div>
        <div className="porfilePic">profile pic</div>
      </div>
      <div className="content">
        <SideBar />
        <Outlet context={[token, user]} />
      </div>
    </div>
  );
}

export default App;
