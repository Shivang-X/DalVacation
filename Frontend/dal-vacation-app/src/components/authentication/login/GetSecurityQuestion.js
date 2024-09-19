import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store";


function GetSecurityQuestion() {
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
    const retrieveQuestion = async () => {
      try {
        const response = await axios.post(
          `https://d5vbhid2fj.execute-api.us-east-1.amazonaws.com/dal-vacation/security/login-security`,
          {
            id: parseInt(user.id),
          }
        );
        const { question, answer } = response.data.body;
        setSecurityQuestion(question);
        setCorrectAnswer(answer);
      } catch (error) {
        setError("Error retrieving security question");
        console.error(error);
      }
    };
    retrieveQuestion();
  }, [username]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (answer === correctAnswer) {
      navigate("/login/ceaser-cypher");
    } else {
      setError("Incorrect answer. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        alignItems="center"
        minHeight="60vh"
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Security Question
          </Typography>
          {securityQuestion ? (
            <form onSubmit={submitHandler}>
              <Typography variant="body1" gutterBottom>
                {securityQuestion}
              </Typography>
              <TextField
                label="Your Answer"
                variant="outlined"
                fullWidth
                margin="normal"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              {error && (
                <Typography color="error" gutterBottom>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Next
              </Button>
            </form>
          ) : (
            <Typography>Loading security question...</Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default GetSecurityQuestion;
