import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Paper,
  TableHead,
} from "@mui/material";
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
            maxHeight: "85vh",
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
              <Box
                style={{
                  padding: "10px",
                }}
              >
                <Typography
                  sx={{ fontSize: "1.5rem", fontWeight: 700 }}
                >{`Order#${order.order_id}`}</Typography>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                      }}
                    >
                      <Typography component="div" gutterBottom>
                        Product
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                      }}
                    >
                      {order.product}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                      }}
                    >
                      <Typography component="div" gutterBottom>
                        Karat
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                      }}
                    >
                      {order.karat}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                      }}
                    >
                      <Typography component="div" gutterBottom>
                        Weight
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                      }}
                    >
                      {order.lot_weight}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                      }}
                    >
                      <Typography component="div" gutterBottom>
                        Description
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                      }}
                    >
                      {order.description}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                      }}
                    >
                      <Typography component="div" gutterBottom>
                        Date Placed
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                      }}
                    >
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(order.placed_date))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                      }}
                    >
                      <Typography component="div" gutterBottom>
                        End Date
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                      }}
                    >
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(order.delivery_date))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                      }}
                    >
                      <Typography component="div" gutterBottom>
                        Status
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                      }}
                    >
                      {order.status === 1
                        ? "Active"
                        : order.status === 2
                        ? "Completed"
                        : "Received"}
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>

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
                  Order Received
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
