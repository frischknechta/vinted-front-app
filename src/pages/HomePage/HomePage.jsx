import "./HomePage.css";
import Hero from "../../components/Hero";
import OfferCard from "../../components/OfferCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const HomePage = ({ filters, token, setVisible, visible }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  let request = "";

  if (filters) {
    if (filters.title) {
      request = request + `&${filters.title}`;
    }

    if (filters.priceSort) {
      request = request + `&${filters.priceSort}`;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted--79sf29g9cmjg.code.run/offers?page=${page}&limit=10${request}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [filters, page]);

  const previousPage = () => {
    page > 1 && setSearchParams({ page: page - 1 });
    page > 1 && setPage(page - 1);
  };

  const nextPage = () => {
    page < Math.ceil(data.count / 10) && setSearchParams({ page: page + 1 });
    page < Math.ceil(data.count / 10) && setPage(page + 1);
  };

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <main>
      <Hero token={token} visible={visible} setVisible={setVisible} />
      <div className="wrapper">
        <div className="offersList">
          {data.offers.map((offer) => {
            return <OfferCard key={offer._id} offer={offer} />;
          })}
        </div>
        <div className="pages">
          <button onClick={previousPage}>Page précédente</button>
          <span>
            {page} / {Math.ceil(data.count / 10)}
          </span>
          <button onClick={nextPage}>Page suivante</button>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
