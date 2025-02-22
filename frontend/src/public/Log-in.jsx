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

  // useEffect(() => {
  //   fetch(`${API_URL}/auth/oauth2/redirect/google`, {
  //     method: "get",
  //     mode: "cors",
  //   })
  //     .then((respose) => respose.json())
  //     .then((data) => console.log(data));
  // }, []);

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
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

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
          <a href="http://localhost:3000/auth/google">Google</a>
          <h1>Don't have an account?</h1>
          <Link to={"/auth/sign-in"}>Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LogPage;
