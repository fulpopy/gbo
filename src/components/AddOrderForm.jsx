import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const karigarList = [
  { name: "Karigar A", description: "Expert in intricate designs" },
  { name: "Karigar B", description: "Specializes in gold rings" },
  { name: "Karigar C", description: "Known for traditional patterns" },
  { name: "Karigar D", description: "Jeweler with gemstone expertise" },
  { name: "Karigar E", description: "Minimalist and modern designs" },
  { name: "Karigar F", description: "Floral patterns and pendants" },
  { name: "Karigar G", description: "Heavy chains and bold designs" },
  { name: "Karigar H", description: "Delicate charms and anklets" },
  { name: "Karigar I", description: "Traditional gold belts" },
  { name: "Karigar J", description: "Simple and sleek finishes" },
];

const AddOrderForm = ({ onAddOrder, open, setOpen }) => {
  const initialOrderData = {
    client: "",
    karat: "18k",
    weight: "",
    image: null,
    imageName: "",
    description: "",
    datePlaced: "",
    endDate: "",
    karigar: "",
    status: "active",
    customKarat: "",
  };
  const [orderData, setOrderData] = useState(initialOrderData);

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setOrderData({ ...orderData, image: e.target.files[0] });
  };

  const handleCreateOrder = () => {
    const newOrder = {
      ID: Date.now(),
      ...orderData,
      karat:
        orderData.karat === "other" ? orderData.customKarat : orderData.karat,
    };
    console.log(newOrder);
    onAddOrder(newOrder);
    setOrderData(initialOrderData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 300, md: 600 },
          maxHeight: "85vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            marginBottom: 2,
            borderBottom: "2px solid #d1d1d1",
          }}
        >
          Add New Order
        </Typography>
        <form>
          <Grid container spacing={2}>
            {/* Your form fields here */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Client"
                name="client"
                value={orderData.client}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Karat</InputLabel>
                <Select
                  name="karat"
                  value={orderData.karat}
                  onChange={handleChange}
                >
                  <MenuItem value="18k">18K</MenuItem>
                  <MenuItem value="20k">20K</MenuItem>
                  <MenuItem value="22k">22K</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              {orderData.karat === "other" && (
                <TextField
                  fullWidth
                  label="Custom Karat"
                  name="customKarat"
                  value={orderData.customKarat}
                  onChange={handleChange}
                  margin="normal"
                />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Weight (g)"
                name="weight"
                value={orderData.weight}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <Button
                  variant="outlined"
                  color="primary"
                  component="label"
                  startIcon={<FileUploadIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Upload Image
                  <input type="file" hidden onChange={handleImageUpload} />
                </Button>
                {orderData.imageName && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {orderData.imageName}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={orderData.description}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Date Placed"
                name="datePlaced"
                value={orderData.datePlaced}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                name="endDate"
                value={orderData.endDate}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Karigar</InputLabel>
                <Select
                  name="karigar"
                  value={orderData.karigar}
                  onChange={handleChange}
                >
                  {karigarList.map((karigar) => (
                    <MenuItem key={karigar.name} value={karigar.name}>
                      {karigar.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset" margin="normal" fullWidth>
                <RadioGroup
                  row
                  name="status"
                  value={orderData.status}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="active"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="completed"
                    control={<Radio />}
                    label="Completed"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateOrder}
            >
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddOrderForm;
