import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import { PersonAdd as PersonAddIcon, Close } from "@mui/icons-material";
import { registerUser } from "../server/api";

const UserCreationForm = ({ open, onClose, onUserCreated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username,
        password,
        roles: role === "admin" ? ["admin"] : ["user"],
      };
      await registerUser(userData);
      setUsername("");
      setPassword("");
      setRole("");
      onUserCreated();
      onClose();
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-creation-modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
          maxWidth: "500px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            backgroundColor: "#D4AF37",
            p: 1,
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          Create New User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            variant="outlined"
            sx={{ mb: 2 }}
            inputProps={{ maxLength: 150 }}
          />
          <Typography variant="body2" color="textSecondary">
            {`${username.length}/150`}
          </Typography>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            variant="outlined"
            sx={{ mb: 2 }}
            inputProps={{ maxLength: 128 }}
          />
          <Typography variant="body2" color="textSecondary">
            {`${password.length}/128`}
          </Typography>
          <RadioGroup
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{ mb: 2 }}
            required
          >
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            <FormControlLabel value="user" control={<Radio />} label="User" />
          </RadioGroup>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<PersonAddIcon />}
              sx={{ mt: 2 }}
            >
              Create User
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UserCreationForm;
