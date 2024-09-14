import React, { useState, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../api/login";
import { UserContext } from "../context";


const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });
  const [invalid, setInvalid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setInvalid(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await login(formData.userId, formData.password);
    if (user) {
      localStorage.setItem("accessToken", user.accessToken);
      setUser(user);
      navigate("/home");
    } else {
      setInvalid(true);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: "url(https://picsum.photos/1920/1080)",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="User ID"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              name="userId"
              value={formData.userId}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {invalid && (
              <Typography sx={{ color: "red", fontSize: "12px" }}>
                *Invalid Credentials
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                padding: "10px 0",
                background: "linear-gradient(90deg, #2196f3, #21cbf3)",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
