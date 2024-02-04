import { useState } from "react";
import "./SignupPage.css";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignupPage = ({ setVisible, visible, setToken }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [newsletter, setNewsletter] = useState(false);

  const formData = new FormData();
  formData.append("email", email);
  formData.append("username", userName);
  formData.append("password", password);
  formData.append("newsletter", newsletter);
  formData.append("picture", avatar);

  const sendData = async () => {
    try {
      const response = await axios.post(
        "https://site--backend-vinted--79sf29g9cmjg.code.run/user/signup",
        formData
      );
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
        className="modalSignup"
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
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Nom d'utilisateur"
            required
            value={userName}
            onChange={(event) => {
              const value = event.target.value;
              setUserName(value);
            }}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
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
            required
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              const value = event.target.value;
              setPassword(value);
            }}
          />

          <label htmlFor="avatar" className="avatarInput">
            Choisir son avatar
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={(event) => {
                setAvatar(event.target.files[0]);
              }}
            />
          </label>

          {avatar && (
            <div className="preview">
              <img
                src={URL.createObjectURL(avatar)}
                alt="avatar"
                onLoad={() => {
                  URL.revokeObjectURL(avatar);
                }}
              />
              <button onClick={() => setAvatar(null)}>
                <FontAwesomeIcon icon="xmark" />
              </button>
            </div>
          )}

          <label htmlFor="newsletter">
            <input
              type="checkbox"
              name="newsletter"
              id="newsletter"
              value={newsletter}
              checked={newsletter}
              onChange={() => {
                setNewsletter(!newsletter);
              }}
            />
            S'inscrire à notre newsletter
          </label>
          <p>
            En t’inscrivant, tu confirmes que tu acceptes les Termes &
            Conditions de Vinted , avoir lu la Politique de confidentialité et
            avoir au moins 18 ans.
          </p>
          <button className="signup">S'inscrire</button>
        </form>
        <button
          className="switchToLogin"
          onClick={() => {
            const newObj = { ...visible };
            newObj.page = "login";
            setVisible(newObj);
          }}
        >
          Tu as déjà un compte? Connecte-toi!
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
