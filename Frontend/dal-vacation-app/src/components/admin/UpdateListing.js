import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

function UpdateListing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { room } = location.state;

  const [updatedRoom, setUpdatedRoom] = useState(room);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleUpdateRoom = () => {
    const features = typeof updatedRoom.features === 'string'
      ? updatedRoom.features.split(',').map(feature => feature.trim())
      : updatedRoom.features;

    const payload = {
      roomId: updatedRoom.roomId,
      type: updatedRoom.type,
      price: updatedRoom.price,
      features: features,
      userId: localStorage.getItem('userId'),
    };

    axios
      .post("https://ewdcxqmxtyt3tqz3x2uqoagcpm0zerrr.lambda-url.us-east-1.on.aws/", payload)
      .then((response) => {
        alert("Room updated successfully!");
        navigate("/my-listings");
      })
      .catch((error) => console.error("Error updating room:", error));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Update Listing
      </Typography>
      <Box component="form" onSubmit={(e) => { e.preventDefault(); handleUpdateRoom(); }} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Room Type"
              name="type"
              value={updatedRoom.type}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={updatedRoom.price}
              onChange={handleInputChange}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label="Room Number"
              name="room_no"
              value={updatedRoom.room_no}
              onChange={handleInputChange}
            />
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Features"
              name="features"
              value={updatedRoom.features}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Update Room
        </Button>
      </Box>
    </Container>
  );
}

export default UpdateListing;
