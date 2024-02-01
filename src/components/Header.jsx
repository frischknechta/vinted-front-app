import { Link, useNavigate } from "react-router-dom";
import logoVinted from "../assets/img/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Header = ({ setVisible, visible, token, setToken, setFilters }) => {
  const navigate = useNavigate();

  const [searchBar, setSearchBar] = useState("");

  const handleLogin = () => {
    const newObj = { ...visible };
    newObj.visible = true;
    newObj.page = "login";
    setVisible(newObj);
  };

  useEffect(() => {
    console.log("USE EFFECT");
    searchBar ? setFilters(`title=${searchBar}`) : setFilters("");
  }, [searchBar]);

  return (
    <header>
      <div className="wrapper">
        <Link to="/">
          <img src={logoVinted} alt="Logo Vinted" />
        </Link>
        <div className="searchBarContainer">
          <FontAwesomeIcon icon="fa-magnifying-glass" className="icon" />
          <input
            type="search"
            name="searchBar"
            id="searchBar"
            placeholder="Rechercher des articles"
            value={searchBar}
            onChange={(event) => {
              const value = event.target.value;
              setSearchBar(value);
            }}
          />
        </div>
        <div className="headerRight">
          {token ? (
            <button
              onClick={() => {
                Cookies.remove("token");
                setToken("");
                navigate("/");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  const newObj = { ...visible };
                  newObj.visible = true;
                  newObj.page = "signup";
                  setVisible(newObj);
                }}
              >
                S'inscrire
              </button>
              <button onClick={handleLogin}>Se connecter</button>
            </>
          )}
          <button
            onClick={() => {
              token ? navigate("/publish") : handleLogin();
            }}
          >
            Vends tes articles
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
