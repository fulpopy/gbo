import React from "react";

import { Box, Typography, styled } from "@mui/material";
import OrderTable from "./OrderTable";
import { orders } from "../constants/order";

const Container = styled(Box)`
  margin: 15px 15px 0 15px;
  box-shadow: blue;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
`;

const ContainerText = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
`;

const CompleatedOrderes = () => {
  return (
    <Container
      sx={{
        boxShadow: "0px 0px 10px 0px #d1d1d1",
      }}
    >
      <Box
        style={{
          borderBottom: "2px solid #d1d1d1",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <ContainerText>Compleated Orders</ContainerText>
      </Box>
      <OrderTable orders={orders} active={false} />
    </Container>
  );
};

export default CompleatedOrderes;
