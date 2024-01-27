import { Link, useNavigate } from "react-router-dom";
import logoVinted from "../assets/img/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Header = ({ setVisible, visible, token, setToken }) => {
  const navigate = useNavigate();

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
              <button
                onClick={() => {
                  const newObj = { ...visible };
                  newObj.visible = true;
                  newObj.page = "login";
                  setVisible(newObj);
                }}
              >
                Se connecter
              </button>
            </>
          )}
          <button>Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
