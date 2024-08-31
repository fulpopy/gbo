import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { KarigarContext } from "../context";

const KarigarForm = ({ openKarigarForm, handleCloseKarigarForm, karigar }) => {
  const initialKarigarData = {
    name: "",
    description: "",
    tasks: [],
  };
  const { setKarigars } = useContext(KarigarContext);
  const [karigarData, setKarigarData] = useState(initialKarigarData);

  useEffect(() => {
    if (karigar) {
      setKarigarData({
        name: karigar.name,
        description: karigar.description,
        tasks: karigar.tasks,
      });
    } else {
      setKarigarData(initialKarigarData);
    }
  }, [karigar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKarigarData({ ...karigarData, [name]: value });
  };

  const handleCreateOrUpdateKarigar = () => {
    if (!karigarData.name || !karigarData.description) {
      alert("Please fill in all required fields.");
      return;
    }

    const ID = karigar?.id || Date.now().toString();
    const newKarigar = { [ID]: karigarData };

    setKarigars((prevList) => ({
      ...prevList,
      ...newKarigar,
    }));

    handleCloseKarigarForm();
    setKarigarData(initialKarigarData); 
  };
  return (
    <Modal
      open={openKarigarForm}
      onClose={handleCloseKarigarForm}
      aria-labelledby="karigar-modal-title"
      aria-describedby="karigar-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 300, md: 400 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          outline: "none",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleCloseKarigarForm}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="karigar-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            marginBottom: 2,
            borderBottom: "2px solid #d1d1d1",
          }}
        >
          {karigar ? "Edit Karigar" : "Add New Karigar"}
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={karigarData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={karigarData.description}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateOrUpdateKarigar}
            sx={{ mt: 2 }}
          >
            {karigar ? "Update Karigar" : "Add Karigar"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default KarigarForm;
