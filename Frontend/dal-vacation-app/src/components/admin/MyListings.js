import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

function MyListings() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`https://3fx7fnjghthayrgvbondps5wpa0ygrod.lambda-url.us-east-1.on.aws/?userId=${userId}`)
      .then((response) => {
        if (Array.isArray(response.data.rooms)) {
          setListings(response.data.rooms);
        } else {
          console.error("Response data does not contain an array of rooms:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching listings:", error));
  }, [userId]);

  const handleUpdate = (room) => {
    navigate("/update-listing", { state: { room } });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        My Listings
      </Typography>
      <Grid container spacing={3}>
        {listings.length > 0 ? (
          listings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing.roomId}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Room Type: {listing.type}</Typography>
                  <Typography>Price: ${listing.price} per night</Typography>
                  <Typography>Room Number: {listing.room_no}</Typography>
                  <Typography>Features: {listing.features.join(", ")}</Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdate(listing)}
                >
                  Update
                </Button>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No listings found</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default MyListings;
