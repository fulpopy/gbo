import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import OrderForm from "./OrderForm";
import { OrderContext, KarigarContext } from "../context";
import ConfirmChangeStatus from "./ConfirmChangeStatus";

function OrderModal({ modalOpen, order, handleCloseModal, setOrder, active }) {
  const [openForm, setOpenForm] = useState(false);
  const [openConfirmStatus, setOpenConfirmStatus] = useState(false);
  const { orders, deleteOrder } = useContext(OrderContext);
  const { karigars } = useContext(KarigarContext);
  const handleEdit = () => {
    setOpenForm(true);
  };

  const handleDelete = () => {
    deleteOrder(order.id); // Ensure this id is correct and exists in your orders state
    handleCloseModal(); // Close the modal after deleting
  };
  const handleClickOpen = () => {
    setOpenConfirmStatus(true);
  };

  const handleClose = () => {
    setOpenConfirmStatus(false);
  };

  return (
    <>
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
                {`Order#${order.id}`}
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
                <strong>Date Placed:</strong> {order.datePlaced}
              </Typography>
              <Typography variant="body1">
                <strong>End Date:</strong> {order.endDate}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleClickOpen}
                  sx={{
                    borderColor: "green",
                    color: "green",
                    backgroundColor: "transparent",
                    mr: 1,
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "darkgreen",
                      color: "white",
                    },
                  }}
                >
                  Change Status
                </Button>
                <ConfirmChangeStatus
                  open={openConfirmStatus}
                  handleClose={handleClose}
                  selectedOrder={order}
                  setSelectedOrder={setOrder}
                  active={active}
                  handleCloseModal={handleCloseModal}
                />
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
      {/* Only render the OrderForm if openForm is true */}
      {openForm && (
        <OrderForm
          open={openForm}
          setOpen={setOpenForm}
          order={order}
          setOrder={setOrder}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}

export default OrderModal;
