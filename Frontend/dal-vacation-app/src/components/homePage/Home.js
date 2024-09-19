import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Divider,
} from "@mui/material";

const dummyRooms = [
  {
    id: 1,
    name: "Deluxe Room",
    type: "Deluxe",
    availability: true,
    tariff: 150,
    feedback: "Fantastic room with excellent service!",
    feedbackPolarity: "Positive",
    imageUrl:
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
  },
  {
    id: 2,
    name: "Standard Room",
    type: "Standard",
    availability: false,
    tariff: 100,
    feedback: "Good value for the price.",
    feedbackPolarity: "Positive",
    imageUrl:
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
  },
  {
    id: 3,
    name: "Recreation Room",
    type: "Recreation",
    availability: true,
    tariff: 200,
    feedback: "Perfect for family gatherings!",
    feedbackPolarity: "Positive",
    imageUrl:
      "https://images.pexels.com/photos/206434/pexels-photo-206434.jpeg",
  },
  {
    id: 4,
    name: "Executive Suite",
    type: "Suite",
    availability: true,
    tariff: 300,
    feedback: "Luxurious and spacious!",
    feedbackPolarity: "Positive",
    imageUrl:
      "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg",
  },
  {
    id: 5,
    name: "Single Room",
    type: "Single",
    availability: true,
    tariff: 80,
    feedback: "Cozy and comfortable.",
    feedbackPolarity: "Positive",
    imageUrl:
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
  },
  {
    id: 6,
    name: "Double Room",
    type: "Double",
    availability: false,
    tariff: 120,
    feedback: "Great for couples.",
    feedbackPolarity: "Positive",
    imageUrl:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
  },
  {
    id: 7,
    name: "Family Suite",
    type: "Suite",
    availability: true,
    tariff: 250,
    feedback: "Ideal for families.",
    feedbackPolarity: "Positive",
    imageUrl:
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
  },
  {
    id: 8,
    name: "Luxury Villa",
    type: "Villa",
    availability: true,
    tariff: 500,
    feedback: "The ultimate luxury experience.",
    feedbackPolarity: "Positive",
    imageUrl:
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
  },
  {
    id: 9,
    name: "Budget Room",
    type: "Budget",
    availability: true,
    tariff: 60,
    feedback: "Affordable and decent.",
    feedbackPolarity: "Positive",
    imageUrl:
      "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg",
  },
  {
    id: 10,
    name: "Presidential Suite",
    type: "Suite",
    availability: false,
    tariff: 700,
    feedback: "Best room in the house.",
    feedbackPolarity: "Positive",
    imageUrl:
      "https://www.shutterstock.com/image-illustration/luxury-presidential-suite-bedroom-large-260nw-1237191433.jpg",
  },
];

const companyLogos = [
  "https://images.squarespace-cdn.com/content/v1/5cf79abdcbf0400001cc7a94/030f1b92-09b2-4495-ac5b-308e2f519168/Hamilton-Resize.png",
  "https://www.booklogic.net/wp-content/uploads/2023/09/logo1.jpg",
  "https://ottawajazzfestival.com/wp-content/uploads/2023/05/Embassy-Colour.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKmKYPYkH3zv3rBqkHt51boIRKpNq7J0OwUQ&s",
  "https://cdn.prod.website-files.com/63342d0b1d7f7750e441d85c/634d3e6c6088701fda3c8697_Nav%20bar%20logo%202.png",
];

const Home = () => {
  return (
    <>
      <Container>
        {/* Welcome Section */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "calc(100vh - 64px)", width: "100%" }}
        >
          <Grid item xs={12} md={6}>
            <img
              src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Photo by Thorsten technoman from Pexels"
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Welcome to DalVacationHome!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Discover your perfect getaway with DalVacationHome. Our
              meticulously curated selection of vacation rentals offers a
              diverse range of options, from cozy cabins to luxurious beachfront
              villas. Whether you're planning a romantic weekend, a family
              reunion, or a solo retreat, DalVacationHome provides the ideal
              accommodation to meet your needs. At DalVacationHome, we believe
              that your vacation experience should be exceptional from start to
              finish. Our properties are handpicked to ensure the highest
              standards of comfort, style, and convenience. Enjoy breathtaking
              views, modern amenities, and personalized services that make every
              stay unforgettable
            </Typography>
          </Grid>
          <Box justifyContent={"space-evenly"}>
            <Typography variant="h3">Our Services</Typography>
            <Typography variant="h6" gutterBottom>
              - Comfortable and luxurious rooms
              <br />
              - 24/7 customer support
              <br />
              - Free Wi-Fi and other amenities
              <br />
              - Affordable pricing
              <br />- Beautiful locations and breathtaking views
            </Typography>
          </Box>
        </Grid>

        <Divider sx={{ my: 4 }} />
        <Typography variant="h4" gutterBottom>
          Explore Our Rooms
        </Typography>
        <Box sx={{ overflowX: "auto", display: "flex", gap: 2, py: 2 }}>
          {dummyRooms.map((room) => (
            <Card key={room.id} sx={{ minWidth: 300 }}>
              <CardMedia
                component="img"
                height="200"
                image={room.imageUrl}
                alt={room.name}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {room.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Type: {room.type}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Availability:{" "}
                  {room.availability ? "Available" : "Not Available"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Tariff: ${room.tariff} per night
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Feedback: {room.feedback}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Partners Section */}
        <Typography variant="h4" gutterBottom>
          Our Partners
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {companyLogos.map((logo, index) => (
            <Grid item key={index}>
              <img
                src={logo}
                alt={`Company logo ${index + 1}`}
                style={{ width: 150, height: 150 }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
