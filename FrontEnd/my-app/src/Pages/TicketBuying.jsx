import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";

const YourComponent = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedNumberOfTickets, setSelectedNumberOfTickets] = useState(1);
  const [maxNumberOfTickets, setMaxNumberOfTickets] = useState(10); // Default max value
  const location = useLocation();
  const eventId = location.state?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(eventId);
        const response = await axios.post(
          "http://localhost:4000/getEventDetails",
          {
            eventId,
          }
        );
        console.log("Response from backend:", response.data);
        setResponseData(response.data);
        // Set default values for dropdowns based on responseData
        if (response.data && response.data.stadium) {
          setSelectedLevel(response.data.stadium.sections[0]);
        }
        // Set default values for ticket limit and price range if they are null or zero
        if (
          !response.data ||
          !response.data.ticketLimit ||
          !response.data.ticketLimit.info
        ) {
          setMaxNumberOfTickets(10);
        } else {
          const ticketLimitText = response.data.ticketLimit.info;
          const maxTickets = parseInt(ticketLimitText.match(/\d+/)[0]);
          setMaxNumberOfTickets(maxTickets);
        }
        if (
          !response.data ||
          !response.data.minPriceRange ||
          !response.data.maxPriceRange
        ) {
          setResponseData({
            ...response.data,
            minPriceRange: 40,
            maxPriceRange: 400,
          });
        }
      } catch (error) {
        console.error("Error sending data to backend:", error);
        setError(error);
      }
    };

    if (eventId) {
      fetchData();
    }
  }, [eventId]);

  const handlePurchase = () => {
    // Pass data to checkout page
    navigate("/checkoutpage", {
      state: {
        eventData: responseData,
        numberOfTickets: selectedNumberOfTickets,
        totalPrice: calculateTicketPrice(),
        selectedLevel: selectedLevel,
      },
      replace: true, // Use replace to apply transition effect
    });
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleNumberOfTicketsChange = (e) => {
    setSelectedNumberOfTickets(parseInt(e.target.value));
  };

  const calculateTicketPrice = () => {
    if (!selectedLevel || !selectedNumberOfTickets || !responseData) return 0;

    const levelIndex = responseData.stadium.sections.indexOf(selectedLevel);
    const priceRange = responseData.maxPriceRange - responseData.minPriceRange;
    const priceStep = priceRange / responseData.stadium.sections.length;
    const basePrice = responseData.maxPriceRange - priceStep * levelIndex;
    const totalPrice = basePrice * selectedNumberOfTickets;
    return totalPrice.toFixed(2); // Limit to 2 decimal places
  };

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: "50px" }}>
        <div className="row">
          {responseData && responseData.stadium && (
            <div className="col-md-6">
              <div className="seat-map-container">
                <img
                  src={responseData.stadium.seatMapUrl}
                  alt="Seat Map"
                  className="img-fluid seat-map-image"
                />
              </div>
            </div>
          )}

          <div className="col-md-6">
            <div className="ticket-info-container">
              {responseData && (
                <div className="event-details-box">
                  <h2 className="event-title">{responseData.name}</h2>
                  <div className="event-details">
                    <p className="event-info">
                      <span className="info-label">Type:</span>{" "}
                      {responseData.type}
                    </p>
                    <p className="event-info">
                      <span className="info-label">Location:</span>{" "}
                      {responseData.stadium.name}, {responseData.stadium.city},{" "}
                      {responseData.stadium.state},{" "}
                      {responseData.stadium.country}
                    </p>
                    <p className="event-info">
                      <span className="info-label">Date:</span>{" "}
                      {responseData.startDate}
                    </p>
                    <p className="event-info">
                      <span className="info-label">Start Time:</span>{" "}
                      {responseData.startTime}
                    </p>
                    <p className="event-info">
                      <span className="info-label">Price Range:</span> $
                      {responseData.minPriceRange} - $
                      {responseData.maxPriceRange}
                    </p>
                    <p className="event-info">
                      <span className="info-label">Ticket Limit:</span>{" "}
                      {responseData.ticketLimit && responseData.ticketLimit.info
                        ? responseData.ticketLimit.info
                        : "10"}
                    </p>
                  </div>
                  {/* Ticket Selection Panel */}
                  <div className="ticket-selection-panel">
                    <div className="form-group">
                      <label htmlFor="levelSelect">Select Level:</label>
                      <select
                        id="levelSelect"
                        className="form-control"
                        onChange={handleLevelChange}
                        value={selectedLevel}
                      >
                        {responseData.stadium.sections.map((section) => (
                          <option key={section} value={section}>
                            {section}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="numberOfTicketsSelect">
                        Select Number of Tickets (Max {maxNumberOfTickets}):
                      </label>
                      <select
                        id="numberOfTicketsSelect"
                        className="form-control"
                        onChange={handleNumberOfTicketsChange}
                        value={selectedNumberOfTickets}
                      >
                        {[...Array(maxNumberOfTickets)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="event-info">
                      <span className="info-label">Total Price:</span> $
                      {calculateTicketPrice()}
                    </p>
                    {/* Purchase Tickets Button */}
                    <button
                      className="btn btn-primary purchase-btn"
                      onClick={handlePurchase}
                    >
                      Purchase Tickets
                    </button>
                  </div>
                </div>
              )}
              {/* Render error message if an error occurred */}
              {error && <p className="error-message">Error: {error.message}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourComponent;

// CSS Styles
const styles = `
.container {
  margin-top: 50px;
}

.seat-map-container {
  overflow: hidden;
}

.seat-map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ticket-info-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.event-details-box {
  border: 2px solid #007bff;
  border-radius: 10px;
  padding: 20px;
}

.event-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.event-details {
  margin-bottom: 20px;
}

.event-info {
  font-size: 16px;
  margin-bottom: 15px; /* Added margin-bottom */
}

.info-label {
  font-weight: bold;
}

.ticket-selection-panel {
  margin-top: 20px;
}

.purchase-btn {
  font-size: 16px;
  margin-top: 10px;
}

.error-message {
  font-size: 16px;
  color: red;
  margin-top: 10px;
}
`;

// Inject CSS Styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
