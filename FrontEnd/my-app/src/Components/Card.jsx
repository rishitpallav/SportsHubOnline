import React from "react";
import { CardActions, Button } from "@mui/material";
const Card = ({ name, image, type, onClick }) => {
  const handleClick = () => {
    console.log(name);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={image} alt={name} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-type">{type}</p>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button size="small">Buy Ticket</Button>
        </CardActions>
      </div>
    </div>
  );
};

export default Card;
