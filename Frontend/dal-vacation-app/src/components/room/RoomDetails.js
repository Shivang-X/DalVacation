import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Reviews from "../reviews/Reviews";

const RoomDetails = () => {
  const location = useLocation();
  const { room } = location.state;
  const [bookingDetails, setBookingDetails] = useState({
    startDate: "",
    endDate: "",
  });
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBookRoom = () => {
    fetch(
      "https://fxprribn4j2ifrtme6oe2xm4hu0wimtc.lambda-url.us-east-1.on.aws/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingDetails,
          roomId: room.roomId,
          userId: localStorage.getItem("userId"),
          username: localStorage.getItem("userEmail"),
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert("Booking details has been sent to queue.");
      })
      .catch((error) => console.error("Error booking room:", error));
  };

  const handleReviewSubmit = async () => {
    const reviewData = {
      description: newReview,
      roomId: room.roomId,
      email: localStorage.getItem("userEmail"),
    };

    fetch(
      `https://d5vbhid2fj.execute-api.us-east-1.amazonaws.com/dal-vacation/looker-studio`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setReviews((prevReviews) => [...prevReviews, data]);
        setNewReview("");
      })
      .catch((error) => console.error("Error adding review:", error));

      await axios.post(
        `https://d5vbhid2fj.execute-api.us-east-1.amazonaws.com/dal-vacation/reviews`,
        {
          roomId: room.roomId,
          email: localStorage.getItem("userEmail"),
          username: localStorage.getItem("userName"),
          description: newReview,
          action: "addReview",
        },
        { headers: { "Content-Type": "application/json" } }
      );
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            Room Details
          </Typography>
          <Typography variant="h6">Type: {room.type}</Typography>
          <Typography>Price: ${room.price} per night</Typography>
          <Typography>Features: {room.features.join(", ")}</Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleBookRoom();
            }}
            sx={{ mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Start Date"
                  name="startDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={bookingDetails.startDate}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="End Date"
                  name="endDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={bookingDetails.endDate}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Book Room
            </Button>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleReviewSubmit();
              }}
              sx={{ mt: 2 }}
            >
              <TextField
                fullWidth
                label="Add a review"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                multiline
                rows={4}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Submit Review
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Reviews roomId={room.roomId} review={newReview}/>
    </Container>
  );
};

export default RoomDetails;
