import axios from "axios";

const sendDataToBackend = async (dataToSend) => {
  try {
    const response = await axios.post(
      "http://example.com/api/endpoint",
      dataToSend
    );
    console.log("Response from backend:", response.data);
    return response.data; // Return the data received from the backend if needed
  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error; // Throw the error to handle it further if needed
  }
};

// Usage:
const dataToSend = {
  key1: "value1",
  key2: "value2",
};

sendDataToBackend(dataToSend)
  .then((responseData) => {
    // Handle the response data if needed
  })
  .catch((error) => {
    // Handle errors if needed
  });
