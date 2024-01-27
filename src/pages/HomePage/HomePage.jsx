import "./HomePage.css";
import Hero from "../../components/Hero";
import OfferCard from "../../components/OfferCard";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-vinted--79sf29g9cmjg.code.run/offers"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <main>
      <Hero />
      <div className="wrapper">
        <div className="offersList">
          {data.offers.map((offer) => {
            return <OfferCard key={offer._id} offer={offer} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
