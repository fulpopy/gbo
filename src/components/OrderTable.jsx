import React, { useContext, useEffect, useState } from "react";
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
  Button,
  Chip,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import OrderModal from "./OrderModal";
import { OrderContext, KarigarContext } from "../context";
import { getBackgroundColor } from "../utils";
import ImageDialog from "./ImageDialog";
import ConfirmDialog from "./ConfirmDialog";
import { Search as SearchIcon } from "lucide-react";

// const blink = keyframes`
//   0% { opacity: 0; }
//   50% { opacity: 1; }
//   100% { opacity: 0; }
// `;

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "5px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(212, 175, 55, 0.1)",
}));

const StyledTableContainer = styled(TableContainer)({
  maxHeight: "calc(100vh - 200px)",
  overflow: "auto",
  // "&::-webkit-scrollbar": {
  //   width: "8px",
  //   height: "8px",
  // },
  // "&::-webkit-scrollbar-track": {
  //   backgroundColor: "#f1f1f1",
  // },
  // "&::-webkit-scrollbar-thumb": {
  //   backgroundColor: "#D4AF37",
  //   borderRadius: "4px",
  // },
});

const StyledTable = styled(Table)({
  borderCollapse: "separate",
  borderSpacing: 0,
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  borderRight: "1px solid #d1d1d1",
  padding: theme.spacing(1.5),
  "&:last-child": { borderRight: "none" },
}));

const StyledHeaderCell = styled(StyledTableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#D4AF37",
  color: theme.palette.getContrastText("#D4AF37"),
  position: "sticky",
  top: 0,
  zIndex: 2,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFF8E1",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#FFFFFF",
  },
  // "&:hover": {
  //   backgroundColor: theme.palette.action.hover,
  // },
}));

// const StyledChip = styled(Chip)(({ theme, karat }) => ({
//   backgroundColor:
//     karat === "18K"
//       ? "#f9a8d4"
//       : karat === "20K"
//       ? "#a5f3fc"
//       : karat === "22K"
//       ? "#d6d3d1"
//       : "transparent",
//   border: "1px solid #D4AF37",
//   padding: theme.spacing(0.5, 1),
//   "& .MuiChip-label": {
//     padding: 0,
//   },
//   "&::before": {
//     content: '""',
//     display: "inline-block",
//     width: "8px",
//     height: "8px",
//     borderRadius: "50%",
//     backgroundColor: "black",
//     marginRight: "6px",
//     animation: `${blink} 1.5s infinite`,
//   },
// }));

const StyledButton = styled(Button)(({ theme }) => ({
  borderColor: "green",
  color: "green",
  backgroundColor: "transparent",
  cursor: "pointer",
  "&:hover": {
    borderColor: "darkgreen",
    color: "darkgreen",
    backgroundColor: "rgba(0, 128, 0, 0.1)",
  },
}));

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
    const temp = orders?.filter((ele) =>
      active
        ? ele.status === "active" || ele.status === "complete"
        : ele.status === "receive"
    );
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
    <StyledBox>
      <Box
        sx={{
          borderBottom: "2px solid #d1d1d1",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          {active ? "Active Orders" : "Received Orders"}
        </Typography>
        <Box sx={{ position: "relative", width: "300px" }}>
          <SearchIcon
            size={20}
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "rgba(0, 0, 0, 0.54)",
            }}
          />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by Product or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                paddingLeft: "35px",
              },
            }}
          />
        </Box>
      </Box>
      <StyledPaper>
        <StyledTableContainer>
          <StyledTable stickyHeader>
            <TableHead>
              <TableRow>
                <StyledHeaderCell>ID</StyledHeaderCell>
                <StyledHeaderCell>Product</StyledHeaderCell>
                <StyledHeaderCell>Karat</StyledHeaderCell>
                <StyledHeaderCell>Lot Weight</StyledHeaderCell>
                <StyledHeaderCell>Images</StyledHeaderCell>
                <StyledHeaderCell>Description</StyledHeaderCell>
                <StyledHeaderCell>Placed Date</StyledHeaderCell>
                <StyledHeaderCell>Delivery Date</StyledHeaderCell>
                <StyledHeaderCell>Karigar</StyledHeaderCell>
                <StyledHeaderCell>Status</StyledHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders?.map((order, index) => (
                <StyledTableRow key={order.order_id}>
                  <StyledTableCell
                    onClick={() => handleCardClick(order)}
                    sx={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "primary.main",
                    }}
                  >
                    {order.order_id}
                  </StyledTableCell>
                  <StyledTableCell>{order.product}</StyledTableCell>
                  <StyledTableCell>
                    {order.karat}
                    {/* <StyledChip label={order.karat} karat={order.karat} /> */}
                  </StyledTableCell>
                  <StyledTableCell>{order.lot_weight}</StyledTableCell>
                  <StyledTableCell
                    sx={{
                      textAlign: "center",
                      maxWidth: "250px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        overflowX: "auto",
                        maxHeight: "120px",
                      }}
                    >
                      {order?.order_images?.map((image, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            flexShrink: 0,
                            marginRight: 1,
                          }}
                        >
                          <img
                            src={image.imageUrl}
                            alt={`Order ${order.order_id}`}
                            style={{
                              height: "90px",
                              objectFit: "cover",
                              cursor: "pointer",
                              borderRadius: "4px",
                            }}
                            onClick={() => handleImageClick(image.imageUrl)}
                          />
                        </Box>
                      ))}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>{order.description}</StyledTableCell>
                  <StyledTableCell
                    sx={{
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(order.placed_date))}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      backgroundColor: getBackgroundColor(order.delivery_date),
                    }}
                  >
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(order.delivery_date))}
                  </StyledTableCell>
                  <StyledTableCell>
                    {karigars?.find(
                      (karigar) => karigar.id === order.karigar_id
                    )?.name || ""}
                  </StyledTableCell>
                  <StyledTableCell>
                    <StyledButton
                      variant="outlined"
                      onClick={() => handleOpenStatusChange(order)}
                    >
                      {order.status === "complete" || order.status === "receive"
                        ? "Mark as Active"
                        : "Mark as Complete"}
                    </StyledButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      </StyledPaper>
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
    </StyledBox>
  );
};

export default OrderTable;
