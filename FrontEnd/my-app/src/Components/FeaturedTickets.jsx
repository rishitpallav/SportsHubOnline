import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ControlledCarousel(props) {
  const [index, setIndex] = useState(0);
  //const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const { events } = props;
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

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
              src={event.image}
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
