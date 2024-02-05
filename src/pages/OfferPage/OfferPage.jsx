import "./OfferPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const OfferPage = ({ token, setVisible, visible }) => {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogin = () => {
    const newObj = { ...visible };
    newObj.visible = true;
    newObj.page = "login";
    setVisible(newObj);
    document.body.setAttribute("style", `position: fixed; left: 0; right: 0;`);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

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

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="offerPage">
      <div className="wrapper offerContainer">
        <div className="offerImage">
          {offer.product_pictures.length > 1 ? (
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive}
              infinite={true}
              autoPlay={false}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {offer.product_pictures.map((picture) => {
                return (
                  <img key={picture.asset_id} src={picture.secure_url} alt="" />
                );
              })}
            </Carousel>
          ) : (
            <img
              className="productImage"
              src={offer.product_image.url}
              alt="Product image"
            />
          )}
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
            <button
              onClick={() => {
                token
                  ? navigate("/payment", {
                      state: {
                        title: offer.product_name,
                        price: offer.product_price,
                      },
                    })
                  : handleLogin();
              }}
            >
              Acheter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
