import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Axios GET request
    axios
      .get("http://localhost:8084/api/forms/list")
      .then(response => {
        // Log the data from the response
        console.log(response.data);
        // You can then update the state with the data if needed
        setMessage(response.data);
      })
      .catch(error => {
        // Handle errors if any
        console.error("There was an error fetching the data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Message from Spring Boot:</h1>
      <p>{message}</p>
    </div>
  );
};

export default App;
