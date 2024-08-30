import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React from "react";

function OrderModal({ modalOpen, order, handleCloseModal }) {
  const handleEdit = () => {
    // Handle edit functionality
    console.log("Edit", order);
    handleCloseModal();
  };

  const handleDelete = () => {
    // Handle delete functionality
    console.log("Delete", order);
    handleCloseModal();
  };
  return (
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
        {order && (
          <>
            <Typography variant="h6" component="div" gutterBottom>
              {`Order#${order.ID}`}
            </Typography>
            <Typography variant="body1">
              <strong>Client:</strong> {order.client}
            </Typography>
            <Typography variant="body1">
              <strong>Karat:</strong> {order.karat}
            </Typography>
            <Typography variant="body1">
              <strong>Weight:</strong> {order.weight}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {order.status}
            </Typography>
            <Typography variant="body1">
              <strong>Date Placed:</strong> {order.date_placed}
            </Typography>
            <Typography variant="body1">
              <strong>End Date:</strong> {order.end_date}
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
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default OrderModal;
