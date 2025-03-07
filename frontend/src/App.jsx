import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import SideBar from "./Sidebar";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { socket } from "./socket";
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(socket.connected);

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };
  useEffect(() => {
    const sotredUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const result = isTokenExpired(storedToken);

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    if (sotredUser && storedToken && !result) {
      console.log(result);

      setUser(JSON.parse(sotredUser));
      setToken(storedToken);
    } else {
      navigate("/auth/log-in");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    console.log(isConnected, " socket");

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
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
