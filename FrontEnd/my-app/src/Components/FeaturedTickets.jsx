import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Make a GET request to fetch event data
        const response = await axios.get("http://localhost:4000/test");
        // Update the events state with the fetched data
        setEvents(response.data);
      } catch (error) {
        // If there's an error, update the error state
        setError(error);
      }
    };
    // Call fetchEvents function when the component mounts
    fetchEvents();
  }, []);

  return (
    <div className="container">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="carousel-custom"
      >
        {events.map((event, idx) => (
          <Carousel.Item key={idx} style={{ height: "300px" }}>
            <img
              className="d-block w-100 img-custom"
              src={
                "https://a.storyblok.com/f/178900/1920x1080/bf1765e73a/frieren-beyond-journey-s-end.jpg/m/1200x0/filters:quality(95)format(webp)"
              }
              alt={`Event ${idx + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>{event.name}</h3>
              <p>{`${event.stadium.addressLine1}, ${event.stadium.city}, ${event.stadium.state}, ${event.stadium.country}`}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
