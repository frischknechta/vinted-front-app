import "./OfferPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const OfferPage = ({ data }) => {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3,
  //     slidesToSlide: 3, // optional, default to 1.
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2,
  //     slidesToSlide: 2, // optional, default to 1.
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //     slidesToSlide: 1, // optional, default to 1.
  //   },
  // };

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
          <img
            className="productImage"
            src={offer.product_image.url}
            alt="Product image"
          />
          {/* <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
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
              console.log("PICTURE>>>>>>>", picture);
              return (
                <li>
                  <img key={picture.asset_id} src={picture.secure_url} alt="" />
                </li>
              );
            })}
          </Carousel> */}
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
                navigate("/payment", {
                  state: {
                    title: offer.product_name,
                    price: offer.product_price,
                  },
                });
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
