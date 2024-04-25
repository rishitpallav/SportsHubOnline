import * as React from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function Info({ totalPrice, eventData, numberOfTickets }) {
  const products = [
    {
      name: eventData.name,
      numberOfTickets: numberOfTickets,
    },
  ];

  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        Event Name and number of tickets
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem
            key={product.name}
            sx={{ py: 1, px: 0, marginLeft: "20px" }}
          >
            <ListItemText
              sx={{ mr: 2 }}
              primary={"Event Name: " + product.name}
              secondary={"Number of tickets:" + " " + numberOfTickets}
            />
            <Typography variant="body1" fontWeight="medium">
              {/* {product.price} */}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
