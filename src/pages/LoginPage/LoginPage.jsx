import "./LoginPage.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setVisible, visible, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendData = async () => {
    try {
      const response = await axios.post(
        "https://site--backend-vinted--79sf29g9cmjg.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      Cookies.set("token", response.data.token);
      setToken(response.data.token);
      const newObj = { ...visible };
      newObj.visible = false;
      newObj.page = "";
      setVisible(newObj);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendData();
  };

  return (
    <div
      className="modalBackground"
      onClick={() => {
        const newObj = { ...visible };
        newObj.visible = false;
        newObj.page = "";
        setVisible(newObj);
      }}
    >
      <div
        className="modalLogin"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          className="close"
          onClick={() => {
            const newObj = { ...visible };
            newObj.visible = false;
            newObj.page = "";
            setVisible(newObj);
          }}
        >
          <FontAwesomeIcon icon="xmark" />
        </button>
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Adresse email"
            required
            value={email}
            onChange={(event) => {
              const value = event.target.value;
              setEmail(value);
            }}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            required
            value={password}
            onChange={(event) => {
              const value = event.target.value;
              setPassword(value);
            }}
          />
          <button className="login">Se connecter</button>
        </form>
        <button
          className="switchToSignup"
          onClick={() => {
            const newObj = { ...visible };
            newObj.page = "signup";
            setVisible(newObj);
          }}
        >
          Pas encore de compte? Inscris-toi!
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
