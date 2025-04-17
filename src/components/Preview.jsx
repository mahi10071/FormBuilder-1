import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";

const Preview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/questions/form/${id}`
        );

        const questionsWithOptions = await Promise.all(
          response.data.map(async (question) => {
            const { controlType, id: questionId } = question;

            const hasOptions = [
              "checkboxgroup",
              "radiobutton",
              "select",
            ].includes(controlType);

            if (hasOptions) {
              try {
                const optionsResponse = await axios.get(
                  `http://localhost:8081/api/question-options/${questionId}/options`
                );
                return { ...question, options: optionsResponse.data };
              } catch (optionError) {
                console.error(
                  `Error fetching options for question ${questionId}:`,
                  optionError
                );
                return { ...question, options: [] };
              }
            } else {
              return question;
            }
          })
        );

        setQuestions(questionsWithOptions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllQuestions();
  }, [id]);

  const handleChange = (id, value) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Paper elevation={3} className="p-8 max-w-3xl mx-auto relative">
        <div className="absolute right-6 top-6">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/form-builder/edit/${id}`)}
          >
            Edit
          </Button>
        </div>

        <Typography variant="h4" className="mb-6 text-center font-bold">
          Form Preview
        </Typography>

        {loading ? (
          <Box className="flex justify-center items-center h-40">
            <CircularProgress />
          </Box>
        ) : questions.length === 0 ? (
          <Typography>No questions found.</Typography>
        ) : (
          <form className="space-y-6">
            {questions.map((question) => (
              <FormControl
                key={question.id}
                fullWidth
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                <FormLabel className="text-lg font-medium mb-2">
                  {question.label}
                </FormLabel>

                {(() => {
                  switch (question.controlType) {
                    case "textbox":
                    case "email":
                    case "number":
                      return (
                        <TextField
                          type={
                            question.controlType === "textbox"
                              ? "text"
                              : question.controlType
                          }
                          variant="outlined"
                          value={formValues[question.id] || ""}
                          onChange={(e) =>
                            handleChange(question.id, e.target.value)
                          }
                          fullWidth
                        />
                      );

                    case "radiobutton":
                      return (
                        <RadioGroup
                          value={formValues[question.id] || ""}
                          onChange={(e) =>
                            handleChange(question.id, e.target.value)
                          }
                        >
                          {question.options.map((opt) => (
                            <FormControlLabel
                              key={opt.id}
                              value={opt.value}
                              control={<Radio />}
                              label={opt.optionText}
                            />
                          ))}
                        </RadioGroup>
                      );

                    case "checkboxgroup":
                      return (
                        <div className="flex flex-col gap-1">
                          {question.options.map((opt) => (
                            <FormControlLabel
                              key={opt.id}
                              control={
                                <Checkbox
                                  checked={
                                    formValues[question.id]?.includes(
                                      opt.value
                                    ) || false
                                  }
                                  onChange={(e) => {
                                    const selected =
                                      formValues[question.id] || [];
                                    const updated = e.target.checked
                                      ? [...selected, opt.value]
                                      : selected.filter(
                                          (val) => val !== opt.value
                                        );
                                    handleChange(question.id, updated);
                                  }}
                                />
                              }
                              label={opt.optionText}
                            />
                          ))}
                        </div>
                      );

                    case "select":
                      return (
                        <Select
                          value={formValues[question.id] || ""}
                          onChange={(e) =>
                            handleChange(question.id, e.target.value)
                          }
                          fullWidth
                        >
                          {question.options.map((opt) => (
                            <MenuItem key={opt.id} value={opt.value}>
                              {opt.optionText}
                            </MenuItem>
                          ))}
                        </Select>
                      );

                    default:
                      return (
                        <Typography color="error">
                          Unsupported control type: {question.controlType}
                        </Typography>
                      );
                  }
                })()}
              </FormControl>
            ))}
          </form>
        )}
      </Paper>
    </div>
  );
};

export default Preview;
