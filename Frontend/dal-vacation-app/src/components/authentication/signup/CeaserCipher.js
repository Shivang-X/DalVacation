import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../../utils/loader";

const CeaserCipher = () => {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `https://d5vbhid2fj.execute-api.us-east-1.amazonaws.com/dal-vacation/cipher/store-cipher`,
        { id: parseInt(userId), key }
      );
      
      const confirmUser = await axios.post(`https://d5vbhid2fj.execute-api.us-east-1.amazonaws.com/dal-vacation/auth/confirm-user`, {
        username: userEmail
      })
      const sendEmail = await axios.post(`https://d5vbhid2fj.execute-api.us-east-1.amazonaws.com/dal-vacation/send-email`, {
        email: userEmail,
        body:"Registered"
      })
      
      setLoading(false);
      if(confirmUser.data.statusCode === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    {loading ? (<LoaderComponent/>) : (<Container maxWidth="sm">
      <Box
        display="flex"
        alignItems="center"
        minHeight="60vh"
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Caesar Cypher
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              label="Enter a key"
              variant="outlined"
              placeholder="example: 10"
              fullWidth
              margin="normal"
              onChange={(e) => setKey(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={submitHandler}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>)}
    </>
  );
};

export default CeaserCipher;
