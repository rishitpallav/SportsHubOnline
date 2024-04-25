// Checkout.js
import React from "react";
import Checkout2 from "../Components/Checkout";

const Checkout = () => {
  // Function to handle logging of order information
  const handleViewOrders = (orderInfo) => {
    // Log the order information
    console.log("Order Information:", orderInfo);
    // Here you can add logic to navigate to the orders page or perform any other action
  };

  return (
    <div>
      <Checkout2 onViewOrders={handleViewOrders} />
    </div>
  );
};

export default Checkout;
