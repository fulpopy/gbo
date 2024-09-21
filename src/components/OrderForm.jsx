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
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { OrderContext, KarigarContext } from "../context";
import { products } from "../constants/products";
import { uploadImagesToS3 } from "../server/awsS3-config";

const OrderForm = ({ open, setOpen, order, setOrder, handleCloseModal }) => {
  const initialOrderData = {
    client: "",
    karat: "18K",
    product: "",
    weight: "",
    images: [],
    description: "",
    datePlaced: "",
    endDate: "",
    karigar: "",
    status: "Active",
    customKarat: "",
  };

  const { karigars } = useContext(KarigarContext);
  const { addOrder, updateOrder } = useContext(OrderContext);

  const [orderData, setOrderData] = useState(initialOrderData);
  const [imageFiles, setImageFiles] = useState([]); // To hold file objects for S3 upload
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setImageFiles([]);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));

    setOrderData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...imagePreviews],
    }));
    setImageFiles([...imageFiles, ...files]); // Store files for S3 upload

    e.target.value = "";
  };

  const removeImage = (index) => {
    setOrderData((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, imgIndex) => imgIndex !== index),
    }));
    setImageFiles(imageFiles.filter((_, imgIndex) => imgIndex !== index));
  };

  const handleCreateOrUpdateOrder = async () => {
    setLoading(true);
    const uploadedImageUrls = await uploadImagesToS3(imageFiles);
    setLoading(false);
    console.log(uploadedImageUrls);
    if (!uploadedImageUrls) {
      console.log("Failed to upload images");
      return;
    }

    const currOrder = {
      id: order ? order.id : Date.now(),
      ...orderData,
      karat:
        orderData.karat === "other" ? orderData.customKarat : orderData.karat,
      product:
        orderData.product === "other"
          ? orderData.customProduct
          : orderData.product,
      images: uploadedImageUrls, // Use the uploaded S3 image URLs
    };

    if (order) {
      if (order.karigar !== orderData.karigar) {
        // removeTaskFromKarigar(order.karigar, order.id);
        // addTaskToKarigar(orderData.karigar, order.id);
      }
      updateOrder(order.id, currOrder);
    } else {
      addOrder(currOrder);
      // addTaskToKarigar(orderData.karigar, currOrder.id);
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
            <Grid item xs={12} md={6}>
              <Box
                mt={1}
                display="flex"
                sx={{
                  overflowX: orderData.images.length === 0 ? "none" : "scroll",
                  height: orderData.images.length === 0 ? "50px" : "130px",
                  bgcolor: "#f5f5f5",
                }}
              >
                {orderData.images.length === 0 ? (
                  <Box
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                    }}
                  >
                    <Typography sx={{ fontSize: "0.875rem" }} color="error">
                      *No image selected
                    </Typography>
                  </Box>
                ) : (
                  orderData.images.map((image, index) => (
                    <Box
                      key={index}
                      sx={{ position: "relative", mr: 1, mb: 1 }}
                    >
                      <img
                        src={image}
                        alt={`Uploaded ${index}`}
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                      <IconButton
                        onClick={() => removeImage(index)}
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          bgcolor: "white",
                          borderRadius: "50%",
                          "&:hover": {
                            bgcolor: "white",
                          },
                        }}
                      >
                        <CloseIcon
                          sx={{ fontSize: "1rem", color: "rgb(0 0 0)" }}
                        />
                      </IconButton>
                    </Box>
                  ))
                )}
              </Box>
              <FormControl fullWidth margin="normal">
                <Button
                  variant="outlined"
                  color="primary"
                  component="label"
                  startIcon={<FileUploadIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Add Images
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={handleImageUpload}
                  />
                </Button>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={6}
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
              disabled={!isValid || loading} // Disable button if form is not valid or loading
              endIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Uploading..." : order ? "Edit Order" : "Create Order"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default OrderForm;
