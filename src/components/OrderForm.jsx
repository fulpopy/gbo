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
import { OrderContext, KarigarContext } from "../context";
import { products } from "../constants/products";

const OrderForm = ({ open, setOpen, order, setOrder, handleCloseModal }) => {
  const initialOrderData = {
    client: "",
    karat: "18K",
    product: "",
    weight: "",
    image: null,
    imageName: "",
    description: "",
    datePlaced: "",
    endDate: "",
    karigar: "",
    status: "Active",
    customKarat: "",
  };

  const { karigars, addTaskToKarigar, removeTaskFromKarigar } =
    useContext(KarigarContext);
  const { addOrder, updateOrder } = useContext(OrderContext);

  const [orderData, setOrderData] = useState(initialOrderData);

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (order) {
      setOrderData({
        ...order,
        datePlaced: order.datePlaced ? order.datePlaced : "",
        endDate: order.endDate ? order.endDate : "",
      });
    }
  }, [order]);

  useEffect(() => {
    // Check if all required fields are filled
    const isFormValid =
      orderData.client &&
      orderData.weight &&
      orderData.datePlaced &&
      orderData.endDate &&
      orderData.karigar &&
      (orderData.karat !== "other" || orderData.customKarat) &&
      (orderData.product !== "other" || orderData.customProduct);

    setIsValid(isFormValid);
  }, [orderData]);

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
    const currOrder = {
      id: order ? order.id : Date.now(),
      ...orderData,
      karat:
        orderData.karat === "other" ? orderData.customKarat : orderData.karat,
      product:
        orderData.product === "other"
          ? orderData.customProduct
          : orderData.product,
    };

    if (order) {
      // Check if the karigar has changed
      if (order.karigar !== orderData.karigar) {
        // Remove the task from the previous karigar's tasks array
        removeTaskFromKarigar(order.karigar, order.id);
        // Add the task to the new karigar's tasks array
        addTaskToKarigar(orderData.karigar, order.id);
      }

      // Update the order
      updateOrder(order.id, currOrder);
    } else {
      // Add the new order
      addOrder(currOrder);

      // Add the task to the selected karigar's tasks array
      addTaskToKarigar(orderData.karigar, currOrder.id);
    }
    if (order) {
      setOrder(currOrder);
      handleCloseModal();
    }

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
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" required>
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
                  required
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
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Product</InputLabel>
                <Select
                  name="product"
                  value={orderData.product}
                  onChange={handleChange}
                >
                  {products &&
                    products.map((product) => (
                      <MenuItem value={product}>{product}</MenuItem>
                    ))}

                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              {orderData.product === "other" && (
                <TextField
                  fullWidth
                  label="Custom product"
                  name="customProduct"
                  value={orderData.customProduct}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              )}
            </Grid>
            {/* <Grid item xs={12} md={6}>
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
            </Grid> */}
            <Grid item xs={12} md={6}>
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
                required
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
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Karigar</InputLabel>
                <Select
                  name="karigar"
                  value={orderData.karigar}
                  onChange={handleChange}
                >
                  {karigars &&
                    karigars.map((karigar) => (
                      <MenuItem key={karigar.id} value={karigar.id}>
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

          <Box
            mt={2}
            display="flex"
            justifyContent="flex-end"
            flexDirection="column"
          >
            {!isValid && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                Please fill all mandatory fields marked with *
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateOrUpdateOrder}
              disabled={!isValid} // Disable button if form is not valid
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
