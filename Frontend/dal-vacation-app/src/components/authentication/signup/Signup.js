import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoaderComponent from "../../utils/loader";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!username) {
      setUsernameError("Username cannot be empty.");
      valid = false;
    }
    if (!email) {
      setEmailError("Email cannot be empty.");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password cannot be empty.");
      valid = false;
    }

    if (!valid) return;

    try {
      setLoading(true);
      const responseSignup = await axios.post(
        `https://d5vbhid2fj.execute-api.us-east-1.amazonaws.com/dal-vacation/auth/signup`,
        { username, email, password, role }
      );
      if (responseSignup.data.statusCode === 400) {
          setSignupError("Error with username / password");
        setLoading(false);
      } else {
        const response = await axios.post(
          `https://d5vbhid2fj.execute-api.us-east-1.amazonaws.com/dal-vacation/store-user-details`,
          { username, email, role }
        );
        setLoading(false);
        if (response.data.statusCode === 200) {
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userId", response.data.userId);
          navigate("/confirm/signup");
        } else {
          setSignupError(
            "Signup failed. Please check your details and try again."
          );
        }
      }
    } catch (error) {
      console.log("Error", error);
      setSignupError("Signup failed. Please check your details and try again.");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value) {
      setUsernameError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError("");
    }
  };

  return (
    <>
      {loading ? (
        <LoaderComponent />
      ) : (
        <Container maxWidth="sm">
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: "background.paper",
              maxHeight: "80vh",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: 0,
              },
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Signup
            </Typography>
            {signupError && (
              <Typography color="error" gutterBottom>
                {signupError}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="dense"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
                error={Boolean(usernameError)}
                helperText={usernameError}
                sx={{
                  marginBottom: 1,
                  "& .MuiInputLabel-root": {
                    fontSize: 14,
                  },
                  "& .MuiInputBase-root": {
                    fontSize: 14,
                  },
                }}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="dense"
                value={email}
                onChange={handleEmailChange}
                error={Boolean(emailError)}
                helperText={emailError}
                sx={{
                  marginBottom: 1,
                  "& .MuiInputLabel-root": {
                    fontSize: 14,
                  },
                  "& .MuiInputBase-root": {
                    fontSize: 14,
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="dense"
                value={password}
                onChange={handlePasswordChange}
                error={Boolean(passwordError)}
                helperText={passwordError}
                // required
                sx={{
                  marginBottom: 1,
                  "& .MuiInputLabel-root": {
                    fontSize: 14,
                  },
                  "& .MuiInputBase-root": {
                    fontSize: 14,
                  },
                }}
              />
              <FormControl variant="outlined" fullWidth margin="dense">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  label="Role"
                  sx={{
                    marginBottom: 1,
                    "& .MuiInputLabel-root": {
                      fontSize: 14,
                    },
                    "& .MuiSelect-root": {
                      fontSize: 14,
                    },
                  }}
                >
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="PropertyAgent">Property Agent</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginTop: 1,
                  padding: 0.5,
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                  fontSize: 14,
                }}
              >
                Signup
              </Button>
            </form>
          </Box>
        </Container>
      )}
    </>
  );
}

export default Signup;
