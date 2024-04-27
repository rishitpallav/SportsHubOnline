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
import { Modal, Select, MenuItem ,Avatar} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function ButtonAppBar({ setSportEvents }) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [userData, setUserData] = React.useState("");
  const [selectedSport, setSelectedSport] = React.useState(null); // Track the selected sport
  const [email, setEmail] = React.useState("");
  const [Username, setUsername] = React.useState("");
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  const handleSearchInputChange = (event) => {
    const searchQuery = event.target.value;
    console.log("Search query:", searchQuery);
    handleSportSearch(searchQuery);   
  };
 
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
  const navigate = useNavigate();
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
    const email2 = localStorage.getItem("email");
    setEmail(email2);
    const Username = localStorage.getItem("username");
    setUsername(Username);
    setUserData(storedUserData);
    console.log(email);
  }, [isLoginModalOpen, userData, email]);

  const handleSportChange = async (sport) => {
    setSelectedSport(sport);
    try {
      const response = await fetch("http://localhost:4000/sportEvents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: "",
          sportType: sport,
          startPage: 0,
          endPage: 20,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSportEvents(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          return [];
        });
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle errors
    }
    // Apply filter logic here
  };
  const handleSportSearch = async (searchQuery) => {
    try {
      const response = await fetch("http://localhost:4000/searchEvents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchQuery: searchQuery,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSportEvents(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          return [];
        });
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle errors
    }
    // Apply filter logic here
  };
  const handleMyPurchases = async () => {
    // Assuming you have the user's email stored in userData
    navigate("/mytickets");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Avatar alt="Icon" src="https://as2.ftcdn.net/v2/jpg/07/47/19/61/1000_F_747196141_Mf69CGAyQNo6ilgzK0m1IOjGSPviFOrd.jpg" sx={{ marginRight: '10px' }} />

          <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
            SportsHub
          </Typography>
          {userData ? (
            <><Button color="inherit" onClick={handleMyPurchases}>
            My Purchases
          </Button></>):(null)}
          {/* Replace buttons with Select dropdown */}
          <Search sx={{ marginRight: "10px" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onClick={handleSearchInputChange}
            />
          </Search>
          <Select
            value={selectedSport}
            onChange={(e) => handleSportChange(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Select a sport" }}
            sx={{marginLeft: '10px',
              minWidth: 120,
              "& .MuiSelect-select": {
                color: "white", // Change text color of selected value to white
              },
            }}
          >
            <MenuItem value={null}>All Sports</MenuItem>
            <MenuItem value="Baseball">Baseball</MenuItem>
            <MenuItem value="Basketball">Basketball</MenuItem>
            <MenuItem value="Soccer">Soccer</MenuItem>
            <MenuItem value="Football">Football</MenuItem>
          </Select>
          {userData ? (
            <>
              <Typography sx={{ mr: 2 ,marginLeft: '10px'}} variant="body1" >
              {Username}
              </Typography>
              <Button color="inherit" sx={{ mr: 2 ,marginLeft: '10px'}} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" sx={{ mr: 2 ,marginLeft: '10px'}} onClick={handleLogin}>
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
