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
          gridAutoRows: "minmax(50px, auto)", // Ensure rows have a minimum height of 50px
          gridAutoColumns: "1fr",
          gap: "0px", // Adjust the gap between grid items (both rows and columns)
          gridRowGap: "0px", // Adjust the gap between grid rows
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "1200px",
          padding: "0px",
        }}
      >
        {/* Rendering 5 Card components */}
        <Card style={{ height: "100%" }} /> {/* Adjust the height as needed */}
        <Card style={{ height: "100%" }} />
        <Card style={{ height: "100%" }} />
        <Card style={{ height: "100%" }} />
        <Card style={{ height: "100%" }} />
        {/* Add more Card components here as needed */}
      </div>
    </div>
  );
};

export default MainPage;
