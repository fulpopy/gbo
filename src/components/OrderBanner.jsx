import { Box, Typography, styled } from "@mui/material";

const Container = styled("Box")`
  display: flex;
  > div {
    display: flex;
    width: 200px;
    border-left: 1px solid;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    word-wrap: break-word;
  }
`;

const OrderBanner = () => {
  return (
    <Container>
      <Box>
        <Typography>ID</Typography>
      </Box>
      <Box>
        <Typography>Client</Typography>
      </Box>
      <Box>
        <Typography>Karat</Typography>
      </Box>
      <Box>
        <Typography>Weight</Typography>
      </Box>
      <Box>
        <Typography>Image</Typography>
      </Box>
      <Box>
        <Typography>Description</Typography>
      </Box>
      <Box>
        <Typography>Date Placed</Typography>
      </Box>
      <Box>
        <Typography>End Date</Typography>
      </Box>
      <Box>
        <Typography>Karigar</Typography>
      </Box>
      <Box>
        <Typography>Change Status</Typography>
      </Box>
    </Container>
  );
};

export default OrderBanner;
