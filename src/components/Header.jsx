import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../icons/logo.png";
import OrderForm from "./OrderForm";
import KarigarList from "./KarigarList";
import UserManagementModal from "./UserManagementModal";
import { UserContext } from "../context";

const pages = ["home", "orders", "history"];
const settings = ["Account", "Logout"];

function Header() {
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1];
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openKarigarModal, setOpenKarigarModal] = useState(false);
  const [openUserManagementModal, setOpenUserManagementModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { logout, isAdmin, user } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleOpen = () => {
    setOpen(true);
    handleCloseNavMenu(false);
  };

  const handleOpenKarigarModal = () => setOpenKarigarModal(true);
  const handleCloseKarigarModal = () => setOpenKarigarModal(false);

  const handleOpenUserManagementModal = () => {
    setOpenUserManagementModal(true);
    handleCloseUserMenu();
  };
  const handleCloseUserManagementModal = () =>
    setOpenUserManagementModal(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavigate = (page) => {
    navigate(`/${page}`);
    handleCloseNavMenu();
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#2E2E2E" }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: "46px", md: "46px !important" },
              px: { xs: 2, md: 3 },
              maxHeight: "50px",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="LOGO"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                width: { md: "50px" },
              }}
            />

            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GBO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page}>
                    <Typography
                      sx={{
                        textTransform: "uppercase",
                        borderBottom:
                          currentPage === page ? "1px solid black" : "0px",
                      }}
                      textAlign="center"
                      onClick={() => handleNavigate(page)}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem>
                  <Typography
                    textAlign="center"
                    sx={{ textTransform: "uppercase" }}
                    onClick={handleOpen}
                  >
                    Add Order
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    textAlign="center"
                    sx={{ textTransform: "uppercase" }}
                    onClick={handleOpenKarigarModal}
                  >
                    Karigars
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box
              component="img"
              src={logo}
              alt="LOGO"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                width: { xs: "50px" },
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GBO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key="home"
                onClick={() => handleNavigate("home")}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  boxShadow:
                    currentPage === "home" ? "0px 0px 5px 0px" : "none",
                }}
              >
                Home
              </Button>
              <Button
                key="orders"
                onClick={() => handleNavigate("orders")}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  boxShadow:
                    currentPage === "orders" ? "0px 0px 5px 0px" : "none",
                }}
              >
                orders
              </Button>
              {isAdmin && (
                <Button
                  key="history"
                  onClick={() => handleNavigate("history")}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    boxShadow:
                      currentPage === "history" ? "0px 0px 5px 0px" : "none",
                  }}
                >
                  history
                </Button>
              )}
              {isAdmin && (
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={handleOpen}
                >
                  ADD ORDER
                </Button>
              )}
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleOpenKarigarModal}
              >
                KARIGARS
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={handleOpenUserMenu}
                sx={{ p: 0, color: "white" }}
              >
                User: {user}
              </Button>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {isAdmin && (
                  <MenuItem
                    key="UserManagement"
                    onClick={handleOpenUserManagementModal}
                  >
                    <Typography textAlign="center">
                      Users (Admin only)
                    </Typography>
                  </MenuItem>
                )}
                <MenuItem key="Logout" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handleLogout}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <OrderForm open={open} setOpen={setOpen} />
      <KarigarList
        openKarigarModal={openKarigarModal}
        setOpenKarigarModal={setOpenKarigarModal}
        handleCloseKarigarModal={handleCloseKarigarModal}
      />
      <UserManagementModal
        open={openUserManagementModal}
        onClose={handleCloseUserManagementModal}
      />
    </>
  );
}

export default Header;
