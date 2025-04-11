import React, { useEffect, useState } from "react";
import axios from "axios";

const Preview = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const response = await axios.get("/api/questions/list");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllQuestions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Questions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <ul>
          {questions.map((question) => (
            <li key={question.id} style={{ marginBottom: "10px" }}>
              <strong>{question.label}</strong> ({question.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Preview;
