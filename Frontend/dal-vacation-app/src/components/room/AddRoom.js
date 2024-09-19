import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Box,
  Chip,
  Select as MUISelect,
  Paper,
} from "@mui/material";
import Select from "react-select";

const roomTypes = [
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
  { value: "queen", label: "Queen" },
  { value: "king", label: "King" },
  { value: "suite", label: "Suite" },
  { value: "studio", label: "Studio" },
  { value: "penthouse", label: "Penthouse" },
];

const featureOptions = [
  { value: "wifi", label: "WiFi" },
  { value: "tv", label: "TV" },
  { value: "ac", label: "Air Conditioning" },
  { value: "heater", label: "Heater" },
  { value: "fridge", label: "Fridge" },
];

function AddRoom() {
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const navigate = useNavigate();
  const role = localStorage.getItem("Role");
  const [formData, setFormData] = useState({
    type: "",
    price: "",
    features: [],
    room_no: "",
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      type: roomType,
      price: price,
      features: features.map((feature) => feature.value),
      room_no: roomNumber,
      userId: localStorage.getItem("userId"),
    }));
  }, [roomType, price, features, roomNumber]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.type) {
      newErrors.type = "Type is required";
      isValid = false;
    }
    if (!formData.price) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (!/^\d+$/.test(formData.price)) {
      newErrors.price = "Price should only contain digits";
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formDataToSend = formData;
        const response = await axios.post(
          "https://65dmya5fhxtivlldh4zt45lpjq0awspv.lambda-url.us-east-1.on.aws/",
          formDataToSend
        );
        navigate("/my-listings");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <>
      {role === "PropertyAgent" ? (
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Add Room
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                <InputLabel id="room-type-label">Room Type</InputLabel>
                <MUISelect
                  labelId="room-type-label"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  label="Room Type"
                >
                  {roomTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </MUISelect>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Room Number"
                type="number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box mt={2}>
                <InputLabel>Features</InputLabel>
                <Select
                  isMulti
                  options={featureOptions}
                  value={features}
                  onChange={setFeatures}
                  components={{
                    MultiValue: ({ children, ...props }) => (
                      <Chip
                        {...props.innerProps}
                        label={children}
                        {...props.data}
                        onDelete={props.removeProps.onClick}
                        deleteIcon={null}
                        variant="outlined"
                        sx={{ margin: 0.5 }}
                      />
                    ),
                  }}
                  sx={{ mt: 1 }}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Add Room
              </Button>
            </form>
          </Paper>
        </Container>
      ) : (
        <div>Access Denied</div>
      )}
    </>
  );
}

export default AddRoom;
