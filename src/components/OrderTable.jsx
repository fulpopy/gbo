import { useContext, useEffect, useState } from "react";
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
import OrderModal from "./OrderModal";
import { OrderContext, KarigarContext } from "../context";

const OrderTable = ({ active }) => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { orders } = useContext(OrderContext);
  const { karigars } = useContext(KarigarContext);
  useEffect(() => {
    let temp;
    if (active) {
      temp = orders.filter((ele) => ele.status === "Active");
    } else {
      temp = orders.filter((ele) => ele.status === "Completed");
    }
    setCurrentOrders(temp);
    // console.log(orders);
  }, [orders]);

  const handleCardClick = (order) => {
    // console.log(order);
    setSelectedOrder(order);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ whiteSpace: "nowrap" }}>
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
              <TableCell sx={{ textAlign: "center" }}>id</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Client</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Karat</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Weight</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Image</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Description</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Date Placed</TableCell>
              <TableCell sx={{ textAlign: "center" }}>End Date</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Karigar</TableCell>
              {/* <TableCell sx={{ textAlign: "center" }}>Change Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.map((order, index) => (
              <TableRow
                key={order.id}
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
                    textAlign: "center",
                  }}
                >
                  {order.id}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {order.client}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {order.karat}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {order.weight}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <img
                    src={order.image}
                    alt="Order"
                    style={{ width: "100px", height: "auto" }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {order.description}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {order.datePlaced}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {order.endDate}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {karigars.map((karigar) => {
                    if (karigar.id === order.karigar) {
                      return karigar.name;
                    }
                    return "";
                  })}
                </TableCell>
                {/* <TableCell sx={{ textAlign: "center" }}>
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
                      onClick={() => handleClickOpen(order)}
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
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <OrderModal
        modalOpen={modalOpen}
        order={selectedOrder}
        setOrder={setSelectedOrder}
        handleCloseModal={handleCloseModal}
        active={active}
      />
    </>
  );
};

export default OrderTable;
