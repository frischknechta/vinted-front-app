import heroBanner from "../assets/img/hero-banner.jpg";

const Hero = () => {
  return (
    <div className="heroBlock">
      <div className="heroBackground">
        {/* <img src={heroBanner} alt="Hero banner" /> */}
      </div>
      <div className="heroContainer wrapper">
        <div className="contentBlock">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button className="sellButton">Vends maintenant</button>
          <a href="">Découvrir comment ça marche</a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
