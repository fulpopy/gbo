import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Modal,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const karigars = [
  { name: "Karigar A", description: "Expert in gold necklaces" },
  { name: "Karigar B", description: "Specializes in rings" },
  { name: "Karigar C", description: "Expert in bangles" },
  { name: "Karigar D", description: "Earrings specialist" },
  { name: "Karigar E", description: "Bracelet designer" },
  { name: "Karigar F", description: "Pendant craftsman" },
  { name: "Karigar G", description: "Chain designer" },
  { name: "Karigar H", description: "Anklet specialist" },
  { name: "Karigar I", description: "Gold belt expert" },
  { name: "Karigar J", description: "Simple ring designer" },
];

const KarigarList = ({
  openKarigarModal,
  setOpenKarigarModal,
  handleCloseKarigarModal,
}) => {
  return (
    <Modal
      open={openKarigarModal}
      onClose={handleCloseKarigarModal}
      aria-labelledby="karigar-modal-title"
      aria-describedby="karigar-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 300, md: 600 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxHeight: "85vh",
          outline: "none",
          overflowY: "auto",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleCloseKarigarModal}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="karigar-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            marginBottom: 2,
            borderBottom: "2px solid #d1d1d1",
          }}
        >
          KARIGAR LIST
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
          }}
        >
          {karigars.map((karigar) => (
            <Grid item key={karigar.id}>
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px",
                    backgroundColor: "lightgrey", // Set your desired background color
                    borderRadius: "4px", // Optional: Add some border-radius for a rounded look
                  }}
                >
                  <Typography variant="h6">{karigar.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="h6">{karigar.description}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    sx={{
                      margin: "0px 10px",
                      color: "grey.700", // Default color
                      "&:hover": {
                        color: "blue", // Change to blue on hover
                      },
                    }}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      margin: "0px 10px",
                      color: "grey.700", // Default color
                      "&:hover": {
                        color: "red", // Change to red on hover
                      },
                    }}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* <SpeedDial
             ariaLabel="SpeedDial for adding karigar"
             sx={{ position: "absolute", bottom: 16, right: 16 }}
             icon={<SpeedDialIcon openIcon={<AddIcon />} />}
           >
             <SpeedDialAction
               icon={<AddIcon />}
               tooltipTitle="Add Karigar"
               onClick={() => {
                 // Add Karigar logic here
               }}
             />
           </SpeedDial> */}
      </Box>
    </Modal>
  );
};

export default KarigarList;
