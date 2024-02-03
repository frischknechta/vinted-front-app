import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ total, title }) => {
  const elements = useElements();
  const stripe = useStripe();

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
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit} id="checkoutForm">
          <CardElement />
          <button type="submit">Payer</button>
        </form>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </>
  );
};

export default CheckoutForm;
