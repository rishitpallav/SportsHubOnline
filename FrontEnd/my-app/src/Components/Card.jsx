import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Fern"
        height="140"
        image="https://www.themarysue.com/wp-content/uploads/2024/03/Fern-Frieren-Beyond-Journeys-End.webp"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Fern
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Something about Fern
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
