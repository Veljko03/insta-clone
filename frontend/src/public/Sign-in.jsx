import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import "./public.css";
import { Link, useNavigate } from "react-router-dom";

const SignPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;

  const handleSignIn = (e) => {
    e.preventDefault();
    if (name == "" || email == "" || password == "") {
      alert("Enter values first");
    }
    const user = { email, name, password };
    fetch(`${API_URL}/auth/sign-in`, {
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
          setName("");
          setPassword("");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          navigate("/auth/log-in");
        }
      });
  };

  return (
    <div className="mainContainer">
      <div className="topTitle">Insta Clone</div>
      <div className="formContainer">
        <div className="section1">
          <div>Create New</div>
          <div>Acoount</div>
        </div>
        <form onSubmit={handleSignIn} className="section2">
          <Input
            typeOfInput={"name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          <Button label={"Sign up"} />
        </form>
        <div className="section3">
          <h1>Allready have an account?</h1>
          <Link to={"/auth/log-in"}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignPage;
