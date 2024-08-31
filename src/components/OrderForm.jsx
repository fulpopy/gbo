import React, { useState, useEffect, useContext } from "react";
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
import { KarigarContext } from "../context";

const OrderForm = ({ onAddOrder, open, setOpen, order }) => {
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
  const { karigars } = useContext(KarigarContext);
  const [orderData, setOrderData] = useState(initialOrderData);

  // Helper function to format date to yyyy-mm-dd
  const formatDateForInput = (date) => {
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (order) {
      // console.log(order);
      setOrderData({
        ...order,
        datePlaced: order.datePlaced
          ? formatDateForInput(order.datePlaced)
          : "",
        endDate: order.endDate ? formatDateForInput(order.endDate) : "",
      });
    }
  }, [order]);

  const handleClose = () => {
    setOrderData(initialOrderData);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setOrderData({ ...orderData, image: e.target.files[0] });
  };

  const handleCreateOrUpdateOrder = () => {
    const updatedOrder = {
      ID: order ? order.ID : Date.now(),
      ...orderData,
      karat:
        orderData.karat === "other" ? orderData.customKarat : orderData.karat,
    };
    console.log(updatedOrder);
    onAddOrder(updatedOrder);
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
          {order ? "Edit Order" : "Add New Order"}
        </Typography>
        <form>
          <Grid container spacing={2}>
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
                  <MenuItem value="18K">18K</MenuItem>
                  <MenuItem value="20K">20K</MenuItem>
                  <MenuItem value="22K">22K</MenuItem>
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
                  {karigars &&
                    Object.keys(karigars).map((karigarId) => {
                      const karigar = karigars[karigarId];
                      return (
                        <MenuItem key={karigar.name} value={karigar.name}>
                          {karigar.name}
                        </MenuItem>
                      );
                    })}
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
                    value="Active"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="Completed"
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
              onClick={handleCreateOrUpdateOrder}
            >
              {order ? "Edit Order" : "Create Order"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default OrderForm;
