import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ total, title }) => {
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement);

    console.log(stripeResponse);

    const stripeToken = stripeResponse.token.id;

    const response = await axios.post(
      "https://site--backend-vinted--79sf29g9cmjg.code.run/pay",
      {
        stripeToken: stripeToken,
        price: total,
        title: title,
      }
    );

    console.log(response.data);
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit} id="checkoutForm">
          <CardElement />
          <button type="submit">Payer</button>
        </form>
      ) : (
        <>
          <div className="checkoutSucceeded">
            <p>Paiement effectué ! </p>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Revenir à la page d'accueil
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutForm;
