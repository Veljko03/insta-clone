import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import SideBar from "./Sidebar";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { socket } from "./socket";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    const wakeUpBackend = async () => {
      await fetch(`${API_URL}/health-check`, {
        method: "get",
        mode: "cors",
      })
        .then((res) => {
          if (res.ok) {
            console.log("Backend is awake");
            setBackendReady(true);
          }
        })
        .catch((error) => {
          console.error("Failed to wake up backend:", error);
        });
    };

    wakeUpBackend();
  }, []);

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
      setRerender((prev) => !prev);
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

  useEffect(() => {
    if (!user || !token) return;
    console.log("ide");

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
        setProfile(data);
      })
      .catch((error) => console.log(error));
  }, [user]);

  if (!backendReady) {
    return (
      <div>
        <h1 style={{ color: "white" }}>HI please wait a bit :(</h1>
        <h1 style={{ color: "white" }}>
          Im using free server and its on sleep mode now, page will load soon
        </h1>
      </div>
    );
  }
  if (!user || !token) return null;

  return (
    <div className="appContainer">
      <div className="header">
        <div className="titile">Insta Clone</div>

        <div onClick={() => navigate("/view-profile")} className="porfilePic">
          <img className="profilePicture" src={profile?.profile_image} alt="" />
        </div>
      </div>
      <div className="content">
        <SideBar />
        <Outlet context={[token, user]} />
      </div>
    </div>
  );
}

export default App;
