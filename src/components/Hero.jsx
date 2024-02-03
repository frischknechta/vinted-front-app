import { useNavigate } from "react-router-dom";

const Hero = ({ token, setVisible, visible }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const newObj = { ...visible };
    newObj.visible = true;
    newObj.page = "login";
    setVisible(newObj);
  };

  return (
    <div className="heroBlock">
      <div className="heroBackground"></div>
      <div className="heroContainer wrapper">
        <div className="contentBlock">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button
            className="sellButton"
            onClick={() => {
              token ? navigate("/publish") : handleLogin();
            }}
          >
            Vends maintenant
          </button>
          <a href="">Découvrir comment ça marche</a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
