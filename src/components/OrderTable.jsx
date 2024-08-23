import { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from "@mui/material";

const OrderTable = ({ orders, active }) => {
  const [currentOrders, setCurrentOrders] = useState([]);
  useEffect(() => {
    let temp;
    if (active) {
      temp = orders.filter((ele) => ele.status === "Active");
    } else {
      temp = orders.filter((ele) => ele.status === "Completed");
    }
    setCurrentOrders(temp);
  }, [currentOrders]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleClickOpen = (ele) => {
    setSelectedOrder(ele);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleConfirmChange = () => {
    selectedOrder.status =
      selectedOrder.status === "Active" ? "Completed" : "Active";
    console.log(`Status changed for order ID: ${selectedOrder}`);
    handleClose();
  };
  return (
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
            <TableCell>ID</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Karat</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date Placed</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Karigar</TableCell>
            <TableCell>Change Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentOrders.map((row, index) => (
            <TableRow
              key={row.ID}
              sx={{
                backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
              }}
            >
              <TableCell>{row.ID}</TableCell>
              <TableCell>{row.client}</TableCell>
              <TableCell>{row.karat}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell>
                <img
                  src={row.image}
                  alt="Order"
                  style={{ width: "100px", height: "auto" }}
                />
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.date_placed}</TableCell>
              <TableCell>{row.end_date}</TableCell>
              <TableCell>{row.karigar}</TableCell>
              <TableCell>
                <Tooltip
                  title={
                    active
                      ? "Once the status is changed, you will find the order in the history tab."
                      : "Once the status is changed, you will find the order in the Active tab."
                  }
                >
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleClickOpen(row)}
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
                    Change Status
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </TableContainer>
  );
};

export default OrderTable;
