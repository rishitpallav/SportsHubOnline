import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure to import Bootstrap CSS

function ControlledCarousel() {
  const [index, setIndex] = React.useState(0);

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
        {/* Add custom class to Carousel */}
        <Carousel.Item style={{ height: "300px" }}>
          {" "}
          {/* Set carousel height */}
          <img
            className="d-block w-100 img-custom"
            src="https://i0.wp.com/inbetweendrafts.com/wp-content/uploads/2023/09/Frn_EP01_still_013.jpg?fit=1920%2C1080&ssl=1"
            alt="First slide"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: "300px" }}>
          {" "}
          {/* Set carousel height */}
          <img
            className="d-block w-100 img-custom"
            src="https://i0.wp.com/inbetweendrafts.com/wp-content/uploads/2023/09/Frn_EP01_still_013.jpg?fit=1920%2C1080&ssl=1"
            alt="Second slide"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: "300px" }}>
          {" "}
          {/* Set carousel height */}
          <img
            className="d-block w-100 img-custom"
            src="https://i0.wp.com/inbetweendrafts.com/wp-content/uploads/2023/09/Frn_EP01_still_013.jpg?fit=1920%2C1080&ssl=1"
            alt="Third slide"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
