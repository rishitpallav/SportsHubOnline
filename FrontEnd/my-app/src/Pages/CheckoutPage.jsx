// Checkout.js
import React from "react";
import Checkout2 from "../Components/Checkout";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { eventData, numberOfTickets, totalPrice } = location.state;
  // Function to handle logging of order information
  const handleViewOrders = (orderInfo) => {
    // Log the order information
    console.log("Order Information:", orderInfo);
    // Here you can add logic to navigate to the orders page or perform any other action
  };

  return (
    <div>
      <Checkout2
        onViewOrders={handleViewOrders}
        eventData={eventData}
        numberOfTickets={numberOfTickets}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default Checkout;
