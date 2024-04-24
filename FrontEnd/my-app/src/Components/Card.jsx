import React from "react";
import { CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Card = ({ name, image, type, onClick, id }) => {
  const navigate = useNavigate(); // Moved inside the component

  const handleClick = () => {
    console.log(id);
    navigate("/viewevent", { state: { id } });
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={image} alt={name} className="card-image" />
      <div className="card-content">
        <h4 className="card-title">{name}</h4>
        <p className="card-type">{type}</p>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button size="small">Buy Ticket</Button>
        </CardActions>
      </div>
    </div>
  );
};

export default Card;
