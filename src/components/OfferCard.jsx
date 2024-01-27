import { Link } from "react-router-dom";

const OfferCard = ({ offer }) => {
  const handleSize = () => {
    const index = offer.product_details.findIndex(
      (element) => element.TAILLE !== undefined
    );
    if (index !== -1) {
      return offer.product_details[index].TAILLE;
    }
  };

  const handleBrand = () => {
    const index = offer.product_details.findIndex(
      (element) => element.MARQUE !== undefined
    );
    if (index !== -1) {
      return offer.product_details[index].MARQUE;
    }
  };

  return (
    <div className="offerCardContainer">
      <div className="userInfos">
        <div className="avatar">
          {offer.owner.account.avatar ? (
            <img src={offer.owner.account.avatar.secure_url} alt="Avatar" />
          ) : (
            ""
          )}
        </div>
        <span>{offer.owner.account.username}</span>
      </div>
      <Link to={`/offer/${offer._id}`} className="link">
        <div className="imageContainer">
          <img
            className="productImage"
            src={offer.product_image.secure_url}
            alt="Product image"
          />
        </div>
        <div className="offerCardBottom">
          <div className="price">{offer.product_price} €</div>
          <div>{handleSize()}</div>
          <div>{handleBrand()}</div>
        </div>
      </Link>
    </div>
  );
};

export default OfferCard;
