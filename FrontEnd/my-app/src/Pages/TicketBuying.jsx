import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const YourComponent = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
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
    navigate("/checkoutpage");
  };

  return (
    <div className="container">
      <div className="row">
        {/* Render seat map image if available */}
        {responseData && responseData.stadium && (
          <div className="col-md-6">
            <div style={{ width: "100%", height: "100%", marginTop: "20%" }}>
              <img
                src={responseData.stadium.seatMapUrl}
                alt="Seat Map"
                className="img-fluid"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        )}

        <div className="col-md-6">
          <div
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginTop: "20%",
            }}
          >
            {/* Render response data if available */}
            {responseData && (
              <div>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Event: {responseData.name}
                </p>
                <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                  Type: {responseData.type}
                </p>
                <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                  Stadium: {responseData.stadium.name},{" "}
                  {responseData.stadium.city}, {responseData.stadium.state},{" "}
                  {responseData.stadium.country}
                </p>
                <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                  Date: {responseData.startDate}
                </p>
                <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                  Start Time: {responseData.startTime}
                </p>
                <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                  Price Range: ${responseData.minPriceRange} - $
                  {responseData.maxPriceRange}
                </p>
                <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                  Ticket Limit: {responseData.ticketLimit.info}
                </p>
                {/* Purchase Tickets Button */}
                <button
                  className="btn btn-primary"
                  onClick={handlePurchase}
                  style={{ fontSize: "16px" }}
                >
                  Purchase Tickets
                </button>
              </div>
            )}
            {/* Render error message if an error occurred */}
            {error && (
              <p style={{ fontSize: "16px", color: "red", marginTop: "10px" }}>
                Error: {error.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
