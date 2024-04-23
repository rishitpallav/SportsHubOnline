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
          padding: "20px",
        }}
      >
        {/* 
          Using CSS Grid to create a grid layout with automatic column sizing
          Each column will have a minimum width of 250px and grow to fill the available space
          The gap between grid items is set to 20px
          Padding is added around the grid
        */}
        <Card />
        {/* Add more Card components here as needed */}
      </div>
    </div>
  );
};

export default MainPage;
