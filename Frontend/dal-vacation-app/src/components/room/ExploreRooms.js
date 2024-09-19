import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://3fx7fnjghthayrgvbondps5wpa0ygrod.lambda-url.us-east-1.on.aws/")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.rooms)) {
          setRooms(data.rooms);
        } else {
          console.error("Error: Data fetched is not in expected format", data);
        }
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  const handleViewRoomDetails = (room) => {
    navigate(`/explore-rooms/${room.roomId}`, { state: { room } });
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Rooms Available
      </Typography>
      <Grid container spacing={3}>
        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.roomId}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Type: {room.type}</Typography>
                  <Typography>Price: ${room.price} per night</Typography>
                  <Typography>Features: {room.features.join(", ")}</Typography>
                </CardContent>

                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewRoomDetails(room)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No rooms available</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default RoomList;
