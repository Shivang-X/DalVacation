import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

function Navbar() {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("Role")
  const navigate = useNavigate();

  let authentication = [
    {
      name: token ? "Logout" : "Login",
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("Role");
    navigate("/");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h4" component={Link} to="/" color={'white'} fontWeight={'bold'}>
          DalVacationHome
        </Typography>

        { role === "PropertyAgent" ? 
        (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ ml: 2 }}
            >
              Home
            </Button>
            <Button
            color="inherit"
            component={Link}
            to="/admin/dashboard"
            sx={{ ml: 2 }}
            >
              Dashboard
            </Button>
            <Button
            color="inherit"
            component={Link}
            to="/my-listings"
            sx={{ ml: 2 }}
            >
              My Listings
            </Button>
            <Button
            color="inherit"
            component={Link}
            to="/add-room"
            sx={{ ml: 2 }}
            >
              Add Room
            </Button>
            {
              token ? ("") : (<Button
                color="inherit"
                component={Link}
                to="/signup"
                sx={{ ml: 2 }}
              >
                Signup
              </Button>)
            }
            {
              authentication.map((item) => (
                <Button
                  color="inherit"
                  component={Link}
                  onClick={handleLogout}
                  to={item.name === "Login" ? "/login" : "/"}
                  sx={{ ml: 2 }}
                >
                  {item.name}
                </Button>
              ))
            }
          </Box>
        ) : role === 'User' ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ ml: 2 }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/explore-rooms"
              sx={{ ml: 2 }}
            >
              Listings
            </Button>
            {
              token ? ("") : (<Button
                color="inherit"
                component={Link}
                to="/signup"
                sx={{ ml: 2 }}
              >
                Signup
              </Button>)
            }
            {
              authentication.map((item) => (
                <Button
                  color="inherit"
                  component={Link}
                  onClick={handleLogout}
                  to={item.name === "Login" ? "/login" : "/"}
                  sx={{ ml: 2 }}
                >
                  {item.name}
                </Button>
              ))
            }
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ ml: 2 }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/explore-rooms"
              sx={{ ml: 2 }}
            >
              Listings
            </Button>
            {
              token ? ("") : (<Button
                color="inherit"
                component={Link}
                to="/signup"
                sx={{ ml: 2 }}
              >
                Signup
              </Button>)
            }
            {
              authentication.map((item) => (
                <Button
                  color="inherit"
                  component={Link}
                  onClick={handleLogout}
                  to={item.name === "Login" ? "/login" : "/"}
                  sx={{ ml: 2 }}
                >
                  {item.name}
                </Button>
              ))
            }
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
