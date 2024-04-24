import React, { useState, useEffect } from "react";
import Header from "./Header";
import FeaturedTickets from "./FeaturedTickets";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [userCity, setUserCity] = useState("");
  const [sportEvents, setSportEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCity = async () => {
      try {
        // Fetch user's IP data
        const ipData = await fetch("https://ipapi.co/json/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const ipJson = await ipData.json();
        // Extract the city from the IP data and set it in state
        setUserCity(ipJson.city);

        // Send the city to the sportevents endpoint
        const response = await fetch("http://localhost:4000/sportEvents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city: ipJson.city,
            sportType: "sport",
            startPage: "0",
            endPage: "12",
          }),
        });
        const data = await response.json();
        // Update the sportEvents state with the fetched data
        setSportEvents(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user's city:", error);
        // Update the error state if there's an error
        setError(error);
      }
    };

    // Call fetchUserCity when the component mounts
    fetchUserCity();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header />
      </div>
      <FeaturedTickets style={{ marginTop: "20px" }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // Display 4 cards in a row
          gap: "20px", // Adjust the gap between grid items
          gridRowGap: "20px", // Adjust the gap between grid rows
          justifyContent: "center", // Center align items horizontally
          maxWidth: "1200px",
          margin: "20px auto", // Center the grid horizontally
          padding: "0px",
        }}
      >
        {/* Rendering Card components for each sports event */}
        {sportEvents.map((event, index) => (
          <Card
            key={index}
            name={event.name}
            image={event.image}
            stadium={event.stadium.name}
            Date={event.startDate}
            Time={event.startTime}
            type={event.type}
            id={event.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
