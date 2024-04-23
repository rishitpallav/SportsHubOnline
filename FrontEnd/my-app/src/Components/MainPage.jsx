import React from "react";
import Header from "./Header";
import FeaturedTickets from "./FeaturedTickets";
import Card from "./Card";

const MainPage = () => {
  return (
    <div>
      <Header />
      <FeaturedTickets />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "1200px", // Adjust max width as per your design
          padding: "0 20px", // Adjust padding as per your design
        }}
      >
        {/* Rendering 5 Card components */}
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        {/* Add more Card components here as needed */}
      </div>
    </div>
  );
};

export default MainPage;
