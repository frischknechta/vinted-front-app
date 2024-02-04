import { Navigate, useLocation } from "react-router-dom";
import "./PaymentPage.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";

const PaymentPage = ({ token }) => {
  const location = useLocation();
  const { title, price } = location.state;
  const protectionCosts = 0.4;
  const shippingCosts = 2.0;
  const total = (price + protectionCosts + shippingCosts).toFixed(2);

  const stripePromise = loadStripe(
    "pk_test_51OfjKNIz1WxpZllhk7nCEPGN1WIt9UXTbIeS0WjbquUYoAfMquLToarP4Pq8tB9PyDk1SsMAZq4KoXfgPhGMAZLF00VgheWLxT"
  );

  return token ? (
    <div className="paymentPage">
      <div className="wrapper paymentContainer">
        <p>Résumé de la commande</p>
        <section>
          <div>
            <span>Commande</span>
            <span>{price.toFixed(2)} €</span>
          </div>
          <div>
            <span>Frais protection acheteur</span>
            <span>{protectionCosts.toFixed(2)} €</span>
          </div>
          <div>
            <span>Frais de port</span>
            <span>{shippingCosts.toFixed(2)} €</span>
          </div>
        </section>
        <section className="total">
          <div>
            <span>Total</span>
            <span>{total} €</span>
          </div>
          <div>
            <span>
              Il ne vous reste plus qu'une étape pour vous offrir
              <em> {title}</em>. Vous allez payer <em> {total} €</em> (frais de
              protection et frais de port inclus).
            </span>
          </div>
        </section>
        <Elements stripe={stripePromise}>
          <CheckoutForm total={total} title={title} />
        </Elements>
      </div>
    </div>
  ) : (
    Navigate("/")
  );
};

export default PaymentPage;
