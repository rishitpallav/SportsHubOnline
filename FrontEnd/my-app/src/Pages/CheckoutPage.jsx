// Checkout.js
import React from "react";
import Checkout2 from "../Components/Checkout";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const [randomTicketId, setrandomTicketId] = useState(null);
  const sendpayment = async (
    eventData,
    numberOfTickets,
    totalPrice,
    selectedLevel,
    randomTicketId,
    email
  ) => {
    const response = fetch("http://localhost:4000/purchaseTicket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: eventData,
        numTickets: numberOfTickets,
        price: totalPrice,
        section: selectedLevel,
        ticketId: randomTicketId,
        email: email,
      }),
    }).then((response) => response.json());
  };

  const location = useLocation();
  const generateTicketNumber = async () => {
    const min = 1000; // Minimum ticket number
    const max = 9999; // Maximum ticket number
    const randomTicketNumber =
      Math.floor(Math.random() * (max - min + 1)) + min;
    setrandomTicketId(randomTicketNumber);
  };
  const { eventData, numberOfTickets, totalPrice, selectedLevel } =
    location.state;
  // Function to handle logging of order information
  const handleViewOrders = (orderInfo) => {
    // Log the order information
    generateTicketNumber(randomTicketId);
    const email = localStorage.getItem("email");
    sendpayment(
      eventData,
      numberOfTickets,
      totalPrice,
      selectedLevel,
      randomTicketId,
      email
    );
    // Here you can add logic to navigate to the orders page or perform any other action
  };

  return (
    <div>
      <Checkout2
        onViewOrders={handleViewOrders}
        eventData={eventData}
        numberOfTickets={numberOfTickets}
        totalPrice={totalPrice}
        handleViewOrders={handleViewOrders}
      />
    </div>
  );
};

export default Checkout;
