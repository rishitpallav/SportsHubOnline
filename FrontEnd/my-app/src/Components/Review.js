import * as React from "react";
import PropTypes from "prop-types";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Review = ({ formData }) => {
  const { cardNumber, namepayment, ExpirationDate } = formData;

  return (
    <Stack spacing={2}>
      <List disablePadding>{/* Existing list items */}</List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        {/* Existing shipment details */}
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {/* Render payment details */}
            <React.Fragment>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: "100%", mb: 1 }}
              >
                <Typography variant="body1" color="text.secondary">
                  Card number:
                </Typography>
                <Typography variant="body2">{cardNumber}</Typography>
              </Stack>
            </React.Fragment>
            <React.Fragment>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: "100%", mb: 1 }}
              >
                <Typography variant="body1" color="text.secondary">
                  Card holder:
                </Typography>
                <Typography variant="body2">{namepayment}</Typography>
              </Stack>
            </React.Fragment>
            <React.Fragment>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: "100%", mb: 1 }}
              >
                <Typography variant="body1" color="text.secondary">
                  Expiry date:
                </Typography>
                <Typography variant="body2">{ExpirationDate}</Typography>
              </Stack>
            </React.Fragment>
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
};

Review.propTypes = {
  formData: PropTypes.shape({
    cardNumber: PropTypes.string,
    namepayment: PropTypes.string,
    ExpirationDate: PropTypes.string,
  }).isRequired,
};

export default Review;
