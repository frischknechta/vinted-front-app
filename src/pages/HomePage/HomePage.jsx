import "./HomePage.css";
import Hero from "../../components/Hero";
import OfferCard from "../../components/OfferCard";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = ({ filters }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const request = filters
    ? `https://site--backend-vinted--79sf29g9cmjg.code.run/offers?${filters}`
    : "https://site--backend-vinted--79sf29g9cmjg.code.run/offers";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(request);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [filters]);

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
