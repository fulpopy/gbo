import React, { useContext } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { deleteUser } from "../server/api";
import { UserContext } from "../context";

const ExistingUsersList = ({ users, onUserDeleted, onOpenCreateForm }) => {
  const { user } = useContext(UserContext);
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      onUserDeleted();
    } catch (error) {
      console.error("Failed to delete u:", error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onOpenCreateForm}
      >
        Create User
      </Button>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          height: "100%",
          maxHeight: "500px",
          overflowY: "auto",
          mt: 1,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            textAlign: "center",
          }}
        >
          Existing Users
        </Typography>
        <List>
          {users?.map((u) => (
            <React.Fragment key={u.id}>
              <ListItem>
                <ListItemText
                  primary={u.username}
                  secondary={u.roles.includes("admin") ? "Admin" : "User"}
                />
                <ListItemSecondaryAction>
                  {user === u.username ? (
                    "Current User"
                  ) : (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteUser(u.id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </>
  );
};

export default ExistingUsersList;
