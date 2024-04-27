import React, { useState } from "react";
import { CardActions, Button, Dialog, DialogContent } from "@mui/material";
import ConfirmationPage from "./ConfirmationPage";
import { useNavigate } from "react-router-dom";
import ViewonMapModal from "./ViewonMapModal";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
const Card = ({
  name,
  image,
  type,
  stadium,
  Date,
  Time,
  onClick,
  id,
  latitude,
  longitude,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleMapClick = () => {
    console.log(id);
    console.log(latitude);
    console.log(longitude);
    setOpen(true); // This directly opens the modal
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleClick = () => {
    console.log(id);
    navigate("/viewevent", { state: { id } });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };

  const cardImageStyle = {
    width: "100%",
    height: "auto",
    borderBottom: "1px solid #ccc",
  };

  const cardContentStyle = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    padding: "16px",
  };

  const cardTitleStyle = {
    margin: "0",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
  };

  const cardTypeStyle = {
    margin: "8px 0",
    color: "#666",
  };

  const buttonStyle = {
    color: "#fff",
    backgroundColor: "#007bff",
    marginTop: "auto",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  return (
    <div style={cardStyle}>
      <img src={image} alt={name} style={cardImageStyle} />
      <div style={cardContentStyle} onClick={handleClick}>
        <h4 style={cardTitleStyle}>{name}</h4>
        <p style={cardTypeStyle}>{type}</p>
        {stadium && <p style={cardTypeStyle}>{stadium}</p>}
        <p style={cardTypeStyle}>Date & Time :</p>
        <p style={cardTypeStyle}>
          {Date} {Time}
        </p>
        <div style={{ marginTop: "auto" }}>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              size="small"
              style={buttonStyle}
              sx={{ "&:hover": buttonHoverStyle }}
              onClick={handleClick}
            >
              Buy Ticket
            </Button>
          </CardActions>
        </div>
      </div>
      <Button onClick={handleMapClick}>View Location on Map</Button>
      {/* <ViewonMapModal open={false} onClose={handleClose} /> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 1200,
            overflowY: "auto",
            borderRadius: 4,
          }}
        >
          <ViewonMapModal
            open={open}
            onClose={handleClose}
            latitude={latitude}
            longitude={longitude}
            name={name}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Card;
