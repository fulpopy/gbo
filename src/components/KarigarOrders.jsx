import React, { useContext, useEffect, useState } from "react";
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
} from "@mui/material";
import { ordersList } from "../constants/order";
import { OrderContext, KarigarContext } from "../context";
import OrderModal from "./OrderModal";
import { getBackgroundColor } from "../utils";

const KarigarOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { orders } = useContext(OrderContext);
  const { karigars } = useContext(KarigarContext);
  const [groupedOrders, setGroupOrderes] = useState({});

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  // useEffect(() => {
  //   console.log("useEffectCalled");

  //   const currOrders = orders.reduce((acc, order) => {
  //     const karigar = karigars.find((k) => k.id === order.karigar);
  //     const name = karigar ? karigar.name : "Unknown Karigar";
  //     if (!acc[name]) {
  //       acc[name] = [];
  //     }
  //     if (order.status === "Active") acc[name].push(order);
  //     return acc;
  //   }, {});
  //   // console.log(currOrders);
  //   setGroupOrderes(currOrders);
  // }, [orders, karigars]);

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
                            width: "210px",
                            border: "5px solid",
                            borderColor: getBackgroundColor(order.endDate),
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
                              Product: {order.product}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Date Placed:{" "}
                              {new Intl.DateTimeFormat("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }).format(new Date(order.datePlaced))}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              End Date:
                              {new Intl.DateTimeFormat("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }).format(new Date(order.endDate))}
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

      <OrderModal
        modalOpen={modalOpen}
        order={selectedOrder}
        handleCloseModal={handleCloseModal}
        setOrder={setSelectedOrder}
      />
    </Box>
  );
};

export default KarigarOrders;
