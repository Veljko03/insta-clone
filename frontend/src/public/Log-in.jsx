import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import "./public.css";
import { Link, useNavigate } from "react-router-dom";

const LogPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;

  const navigate = useNavigate();
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
  useEffect(() => {
    let queryString = window.location.search;
    let objectString = queryString.split("=")[1];
    if (objectString) {
      let decodedObject = JSON.parse(decodeURIComponent(objectString));
      localStorage.setItem("token", decodedObject.token);
      localStorage.setItem("user", JSON.stringify(decodedObject.user));
      navigate("/");
    }
  }, []);

  const handleLogIn = (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      alert("Enter values first");
    }

    const user = { email, password };
    fetch(`${API_URL}/auth/log-in`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          setEmail("");
          setPassword("");
          alert("Wrong email or password");
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log(data, "Data");
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          navigate("/");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
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
  return (
    <div className="mainContainer">
      <div className="topTitle">Insta Clone</div>
      <div className="formContainer">
        <div className="section1">
          <div>Login</div>
        </div>
        <form onSubmit={handleLogIn} className="section2">
          <Input
            typeOfInput={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            typeOfInput={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button label={"Log up"} />
        </form>
        <div className="section3">
          <a href={`${API_URL}/auth/google`}>Google Login</a>
          <h1>Don't have an account?</h1>
          <Link to={"/auth/sign-in"}>Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LogPage;
