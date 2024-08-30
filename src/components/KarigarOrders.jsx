import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Modal,
  Button,
  IconButton,
} from "@mui/material";
import { orders } from "../constants/order";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Close } from "@mui/icons-material";

const KarigarOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  const handleEdit = () => {
    // Handle edit functionality
    console.log("Edit", selectedOrder);
    handleCloseModal();
  };

  const handleDelete = () => {
    // Handle delete functionality
    console.log("Delete", selectedOrder);
    handleCloseModal();
  };

  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.karigar]) {
      acc[order.karigar] = [];
    }
    if (order.status === "Active") acc[order.karigar].push(order);
    return acc;
  }, {});

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Karigar Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#f5f5f5",
                  padding: "16px",
                  fontWeight: "bold",
                  textAlign: "center",
                  position: "sticky",
                  left: 0,
                  zIndex: 1,
                }}
              >
                <strong>Karigar Name</strong>
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#f5f5f5",
                  fontWeight: "bold",
                }}
              >
                <strong>Orders</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(groupedOrders).map((karigar) => (
              <TableRow key={karigar}>
                <TableCell
                  sx={{
                    backgroundColor: "#f5f5f5",
                    padding: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    width: "100px",
                  }}
                >
                  {karigar}
                </TableCell>
                <TableCell sx={{ overflowY: "auto", maxHeight: "300px" }}>
                  <Box sx={{ display: "flex", overflowX: "auto" }}>
                    {groupedOrders[karigar].map((order, index) => (
                      <Box sx={{ padding: "0px 10px" }} key={index}>
                        <Card
                          sx={{
                            height: "150px",
                            width: "200px",
                            border: "3px solid yellow",
                            background:
                              order.karat === "18K"
                                ? "#f9a8d4"
                                : order.karat === "20K"
                                ? "#a5f3fc"
                                : order.karat === "22K"
                                ? "#d6d3d1"
                                : "#FFFFFF",
                            cursor: "pointer", // Change cursor to pointer
                          }}
                          onClick={() => handleCardClick(order)} // Handle card click
                        >
                          <CardContent>
                            <Typography component="div">
                              {order.client}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Karat: {order.karat}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Weight: {order.weight}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Date Placed: {order.date_placed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              End Date: {order.end_date}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    ))}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Order Details */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 300, md: 600 },
            maxHeight: "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={handleCloseModal}
          >
            <Close />
          </IconButton>
          {selectedOrder && (
            <>
              <Typography variant="h6" component="div" gutterBottom>
                {`Order#${selectedOrder.ID}`}
              </Typography>
              <Typography variant="body1">
                <strong>Client:</strong> {selectedOrder.client}
              </Typography>
              <Typography variant="body1">
                <strong>Karat:</strong> {selectedOrder.karat}
              </Typography>
              <Typography variant="body1">
                <strong>Weight:</strong> {selectedOrder.weight}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {selectedOrder.status}
              </Typography>
              <Typography variant="body1">
                <strong>Date Placed:</strong> {selectedOrder.date_placed}
              </Typography>
              <Typography variant="body1">
                <strong>End Date:</strong> {selectedOrder.end_date}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default KarigarOrders;
