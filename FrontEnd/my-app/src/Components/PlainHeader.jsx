import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Modal, Select, MenuItem ,Avatar} from "@mui/material";

import { useNavigate } from "react-router-dom";
export default function DenseAppBar() {
    const navigate = useNavigate();
    const handleHomeChange = (event) => {
        navigate("/");
      };
  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar onClick={() => handleHomeChange()} variant="dense">
        <Avatar alt="Icon" src="https://as2.ftcdn.net/v2/jpg/07/47/19/61/1000_F_747196141_Mf69CGAyQNo6ilgzK0m1IOjGSPviFOrd.jpg" sx={{ marginRight: '10px' }} />

          <Typography variant="h6" color="inherit" component="div">
          SportsHub 
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
