import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { OrderContext } from "../context";

const ConfirmChangeStatus = ({
  open,
  handleClose,
  setSelectedOrder,
  active,
  selectedOrder,
  handleCloseModal,
}) => {
  const { updateOrder } = useContext(OrderContext);
  const handleConfirmChange = () => {
    let currOrder;
    if (active) {
      currOrder = {
        ...selectedOrder,
        status: "Completed",
      };
    } else
      currOrder = {
        ...selectedOrder,
        status: "Active",
      };
    setSelectedOrder(currOrder);
    console.log(currOrder);
    updateOrder(selectedOrder.id, currOrder);
    handleCloseModal();
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure you want to change the status?</DialogTitle>
      <DialogContent>
        {active ? (
          <Typography>
            Once the status is changed, you will find the order in the history
            tab.
          </Typography>
        ) : (
          <Typography>
            Once the status is changed, you will find the order in the active
            tab.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmChange} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmChangeStatus;
