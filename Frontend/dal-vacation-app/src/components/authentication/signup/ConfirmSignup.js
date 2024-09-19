import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ConfirmSignup() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/signup/security-questions");
  };

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Confirm Signup
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please verify your email address to complete the signup process.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleNext}>
        Next
      </Button>
    </div>
  );
}

export default ConfirmSignup;
