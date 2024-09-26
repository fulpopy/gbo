import { useContext, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TextField,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from "@mui/material";
import OrderModal from "./OrderModal";
import { OrderContext, KarigarContext } from "../context";
import { getBackgroundColor } from "../utils";
import ImageDialog from "./ImageDialog";
import ConfirmDialog from "./ConfirmDialog";

const commonCellStyle = {
  textAlign: "center",
  borderRight: "2px solid #d1d1d1",
  "&:last-child": { borderRight: "none" }, // Remove border for the last cell
};

const OrderTable = ({ active }) => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { orders, updateOrder } = useContext(OrderContext);
  const { karigars } = useContext(KarigarContext);
  const [searchTerm, setSearchTerm] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    let temp;
    if (active) {
      temp = orders?.filter(
        (ele) => ele.status === "active" || ele.status === "complete"
      );
    } else {
      temp = orders?.filter((ele) => ele.status === "receive");
    }
    setCurrentOrders(temp);
  }, [orders, active]);

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setImageModalOpen(true);
  };
  const handleCloseImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage(null);
  };

  const handleOpenStatusChange = (order) => {
    setSelectedOrder(order);
    setOpenConfirm(true);
  };
  const handleCloseOpenConfirm = () => {
    setSelectedOrder(null);
    setOpenConfirm(false);
  };

  const handleStatusChange = async () => {
    const updatedOrder = {
      ...selectedOrder,
      status:
        selectedOrder.status === "complete" ||
        selectedOrder.status === "receive"
          ? "active"
          : "complete",
    };
    await updateOrder(updatedOrder);
    setOpenConfirm(false);
    setSelectedOrder(null);
  };

  const filteredOrders = currentOrders?.filter(
    (order) =>
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_id.toString().includes(searchTerm)
  );
  return (
    <>
      <Box
        style={{
          borderBottom: "2px solid #d1d1d1",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "700" }}>
          {active ? "Active Orders" : "Received Orders"}
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by Product or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "300px",
          }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              "& th": {
                borderBottom: "2px solid black",
                fontSize: "1.1rem",
                fontWeight: 500,
              },
            }}
          >
            <TableRow>
              <TableCell sx={commonCellStyle}>id</TableCell>
              <TableCell sx={commonCellStyle}>Product</TableCell>
              <TableCell sx={commonCellStyle}>Karat</TableCell>
              <TableCell sx={commonCellStyle}>Lot Weight</TableCell>
              <TableCell sx={commonCellStyle}>Images</TableCell>
              <TableCell sx={commonCellStyle}>Description</TableCell>
              <TableCell sx={commonCellStyle}>Placed Date</TableCell>
              <TableCell sx={commonCellStyle}>Delivery Date</TableCell>
              <TableCell sx={commonCellStyle}>Karigar</TableCell>
              <TableCell sx={commonCellStyle}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders?.map((order, index) => (
              <TableRow
                key={order.order_id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                }}
              >
                <TableCell
                  onClick={() => handleCardClick(order)}
                  sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "blue",
                    ...commonCellStyle,
                  }}
                >
                  {order.order_id}
                </TableCell>
                <TableCell sx={commonCellStyle}>{order.product}</TableCell>
                <TableCell sx={commonCellStyle}>{order.karat}</TableCell>
                <TableCell sx={commonCellStyle}>{order.lot_weight}</TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    maxWidth: "250px",
                    ...commonCellStyle,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      overflowX: "auto", // Enable horizontal scrolling
                      maxHeight: "120px", // Set a fixed height to prevent row height from increasing
                    }}
                  >
                    {order?.order_images?.map((image, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          flexShrink: 0, // Prevent images from shrinking
                          marginRight: "8px", // Space between images
                        }}
                      >
                        <img
                          src={image.imageUrl}
                          alt={`Order ${order.order_id}`}
                          style={{
                            // width: "100px", // Set the image width
                            height: "90px", // Set a fixed image height to keep it consistent
                            objectFit: "cover", // Ensure the image fits within the box without stretching
                            cursor: "pointer",
                          }}
                          onClick={() => handleImageClick(image.imageUrl)}
                        />
                      </Box>
                    ))}
                  </Box>
                </TableCell>

                <TableCell sx={commonCellStyle}>{order.description}</TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    ...commonCellStyle,
                  }}
                >
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(order.placed_date))}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    backgroundColor: getBackgroundColor(order.delivery_date),
                    ...commonCellStyle,
                  }}
                >
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(order.delivery_date))}
                </TableCell>
                <TableCell sx={commonCellStyle}>
                  {karigars?.map((karigar) => {
                    if (karigar.id === order.karigar_id) {
                      return karigar.name;
                    }
                    return "";
                  })}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    maxWidth: "fit-content",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleOpenStatusChange(order)}
                    sx={{
                      borderColor: "green",
                      color: "green",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      "&:hover": {
                        borderColor: "darkgreen",
                        color: "darkgreen",
                      },
                    }}
                  >
                    {order.status === "complete" || order.status === "receive"
                      ? "Mark as Active"
                      : "Mark as Complete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ImageDialog
        imageModalOpen={imageModalOpen}
        handleCloseImageModal={handleCloseImageModal}
        selectedImage={selectedImage}
      />
      <OrderModal
        modalOpen={modalOpen}
        order={selectedOrder}
        setOrder={setSelectedOrder}
        handleCloseModal={handleCloseModal}
        active={active}
      />
      <ConfirmDialog
        openConfirm={openConfirm}
        handleCloseOpenConfirm={handleCloseOpenConfirm}
        confirmation={handleStatusChange}
        title="Do you want to change the status?"
        info={
          selectedOrder?.status === "complete" ||
          selectedOrder?.status === "receive"
            ? `Mark the order with id ${selectedOrder?.order_id} as Active`
            : `Mark the order with id ${selectedOrder?.order_id} as Complete`
        }
      />
    </>
  );
};

export default OrderTable;
