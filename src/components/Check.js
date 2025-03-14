import React from "react";
import "./styles.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checks from "./Checks";

// const stripePromise = loadStripe("pk_test_35p114pH8oNuHX72SmrvsFqh00Azv3ZaIA");
const stripePromise = loadStripe("pk_test_cQpWfd9LiCh47WuMzQNssAlU00JASuUqEy");


const Check = () => {
  return (
    <div className="">
      {/* <div className="product">
        <img
          src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress"
          alt="laptop"
          style={{ width: "100%", height: "auto" }}
        />
        <div> */}
          <Elements stripe={stripePromise}>
            <Checks />
          </Elements>
        {/* </div>
      </div> */}
    </div>
  );
};

export default Check;