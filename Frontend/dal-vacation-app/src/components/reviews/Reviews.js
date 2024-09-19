import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";

function Reviews({ roomId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.post(
          `https://d5vbhid2fj.execute-api.us-east-1.amazonaws.com/dal-vacation/reviews`,
          {
            roomId: roomId,
            action: "getReviews",
          },
          { headers: { "Content-Type": "application/json" } }
        );

        const getReview = response.data.body;
        console.log(getReview);

        if (Array.isArray(getReview)) {
          setReviews(getReview);
        } else {
          console.log("No reviews found for this room.");
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      }
    };

    if (roomId) {
      fetchReviews();
    } else {
      console.error("Room ID not provided.");
    }
  }, [roomId]);

  const getSentimentPolarity = (sentimentScore) => {
    if (sentimentScore > 0) {
      return "Positive";
    } else if (sentimentScore < 0) {
      return "Negative";
    } else {
      return "Neutral";
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      <Grid container spacing={2}>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{review.description}</Typography>
                  <Typography color="textSecondary">
                    Username: {review.username}
                  </Typography>
                  <Typography color="textSecondary">
                    Polarity:{" "}
                    {getSentimentPolarity(review.sentimentScore.score)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No reviews found for this room.</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Reviews;
