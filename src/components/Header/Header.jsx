import "./Header.css";

import { Link, useNavigate } from "react-router-dom";
import logoVinted from "../../assets/img/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Header = ({
  setVisible,
  visible,
  token,
  setToken,
  setFilters,
  filters,
}) => {
  const navigate = useNavigate();

  const [searchBar, setSearchBar] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleLogin = () => {
    const newObj = { ...visible };
    newObj.visible = true;
    newObj.page = "login";
    setVisible(newObj);
    document.body.setAttribute("style", `position: fixed; left: 0; right: 0;`);
  };

  useEffect(() => {
    console.log("USE EFFECT");
    const newObj = { ...filters };
    if (searchBar) {
      newObj.title = `title=${searchBar}`;
    } else {
      newObj.title = "";
    }

    if (priceSort) {
      newObj.priceSort = `sort=${priceSort}`;
    }
    setFilters(newObj);
  }, [searchBar, priceSort]);

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
              navigate("/");
              const value = event.target.value;
              setSearchBar(value);
            }}
          />
        </div>
        <div className="priceSort">
          <span>Trier par prix: </span>
          <button
            onClick={() => {
              setPriceSort("price-asc");
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-arrow-up-1-9" />
          </button>
          <button
            onClick={() => {
              setPriceSort("price-desc");
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-arrow-down-9-1" />
          </button>
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
                  document.body.setAttribute(
                    "style",
                    `position: fixed; left: 0; right: 0;`
                  );
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
        <div className="visibleS" onClick={() => setShowMenu(!showMenu)}>
          <FontAwesomeIcon icon="fa-bars" />
        </div>
        <div className="visibleS searchBarBottom">
          <FontAwesomeIcon icon="fa-magnifying-glass" className="icon" />
          <input
            type="search"
            name="searchBar"
            id="searchBar"
            placeholder="Rechercher des articles"
            value={searchBar}
            onChange={(event) => {
              navigate("/");
              const value = event.target.value;
              setSearchBar(value);
            }}
          />
        </div>
        <div className={showMenu ? "visible" : "hidden"}>
          <div className="priceSort bottom">
            <span>Trier par prix: </span>
            <button
              onClick={() => {
                setPriceSort("price-asc");
                setShowMenu(!showMenu);
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-arrow-up-1-9" />
            </button>
            <button
              onClick={() => {
                setPriceSort("price-desc");
                setShowMenu(!showMenu);
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-arrow-down-9-1" />
            </button>
          </div>
          <div className="headerRight bottom">
            {token ? (
              <button
                onClick={() => {
                  setShowMenu(!showMenu);
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
                    setShowMenu(!showMenu);
                    const newObj = { ...visible };
                    newObj.visible = true;
                    newObj.page = "signup";
                    setVisible(newObj);
                    document.body.setAttribute(
                      "style",
                      `position: fixed; left: 0; right: 0;`
                    );
                  }}
                >
                  S'inscrire
                </button>
                <button
                  onClick={() => {
                    handleLogin();
                    setShowMenu(!showMenu);
                  }}
                >
                  Se connecter
                </button>
              </>
            )}
            <button
              onClick={() => {
                setShowMenu(!showMenu);
                token ? navigate("/publish") : handleLogin();
              }}
            >
              Vends tes articles
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
