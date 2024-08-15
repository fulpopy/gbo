import { Box, Typography, styled } from "@mui/material";
import OrderBanner from "./OrderBanner";
import ActiveOrderHeader from "./ActiveOrderHeader";

const Container = styled(Box)`
  margin: 15px 15px 0 15px;
  box-shadow: blue;
  border: 1px solid;
  border-radius: 5px;
`;

const ContainerText = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
`;

const ActiveOrders = () => {
  return (
    <Container>
      <Box
        style={{
          borderBottom: "1px solid",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <ContainerText>Active Orders</ContainerText>
      </Box>
      <ActiveOrderHeader />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
      <OrderBanner />
    </Container>
  );
};

export default ActiveOrders;
