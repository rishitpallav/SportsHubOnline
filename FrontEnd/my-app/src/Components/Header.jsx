import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LoginPage from "./LoginModal";
import { Modal } from "@mui/material";
import { useEffect } from "react";

export default function ButtonAppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    // Clear user details from local storage and state
    localStorage.removeItem("userData");
    setUserData(null);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  useEffect(() => {
    // console.log("userData changed:", storedUserData);
    const storedUserData = localStorage.getItem("userData");
    setUserData(storedUserData);
    console.log(userData);
  }, [isLoginModalOpen]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SportsHub
          </Typography>
          {userData ? (
            <>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {"Rishit"}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "",
          },
        }}
      >
        <List>
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemText primary="Get openAI recommendations" />
          </ListItem>
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemText primary="My Purchases" />
          </ListItem>
        </List>
      </Drawer>
      <Modal
        open={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        aria-labelledby="recommendation-modal-title"
        aria-describedby="recommendation-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "30%", // Adjust the width as needed
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            maxHeight: "85vh", // Set max height to 80% of viewport height
            overflow: "auto", // Enable scrolling if content exceeds maxHeight
          }}
        >
          <LoginPage handleCloseLoginModal={handleCloseLoginModal} />
        </Box>
      </Modal>
    </Box>
  );
}
