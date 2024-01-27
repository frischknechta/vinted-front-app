import "./OfferPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const OfferPage = ({ data }) => {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted--79sf29g9cmjg.code.run/offer/${id}`
        );
        console.log(response.data);
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  console.log(offer);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="offerPage">
      <div className="wrapper offerContainer">
        <div className="offerImage">
          <img
            className="productImage"
            src={offer.product_image.url}
            alt="Product image"
          />
        </div>
        <div className="offerInfos">
          <div>
            <h2>{offer.product_price.toFixed(2)} €</h2>
            <ul>
              {offer.product_details.map((detail, index) => {
                return (
                  <li key={index}>
                    <span>{Object.keys(detail)}</span>
                    <span>
                      {
                        Object.getOwnPropertyDescriptor(
                          detail,
                          Object.keys(detail)
                        ).value
                      }
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="divider"></div>
          <div className="offerContent">
            <p className="name">{offer.product_name} </p>
            <p className="description">{offer.product_description} </p>
            <div className="userInfos">
              <div className="offerAvatar">
                {offer.owner.account.avatar ? (
                  <img src={offer.owner.account.avatar.url} alt="Avatar" />
                ) : (
                  ""
                )}
              </div>
              <span>{offer.owner.account.username}</span>
            </div>
          </div>
          <div>
            <button>Acheter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
