import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const sendDataToBackend = async (eventId, setResponseData, setError) => {
  try {
    console.log(eventId);
    const response = await axios.post("http://localhost:4000/getEventDetails", {
      eventId,
    });
    console.log("Response from backend:", response.data);
    setResponseData(response.data); // Update state with response data
  } catch (error) {
    console.error("Error sending data to backend:", error);
    setError(error); // Set error state if an error occurs
  }
};

const YourComponent = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const eventId = location.state?.id;
  const dataToSend = {
    key1: "value1",
    key2: "value2",
  };

  sendDataToBackend(eventId, setResponseData, setError);

  return (
    <div>
      {/* Render response data if available */}
      {responseData && <p>Response from backend: {responseData}</p>}
      {/* Render error message if an error occurred */}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default YourComponent;
