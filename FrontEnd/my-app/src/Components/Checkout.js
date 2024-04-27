import PropTypes from "prop-types";
import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

import ConfirmationPage from "./ConfirmationPage";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import AddressForm from "./AddressForm";
import Info from "./Info";
import InfoMobile from "./InfoMobile";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import ToggleColorMode from "./ToggleColorMode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const steps = ["Payment address", "Payment details", "Review your order"];

const logoStyle = {
  width: "140px",
  height: "56px",
  marginLeft: "-4px",
  marginRight: "-8px",
};

export default function Checkout({
  onViewOrders,
  eventData,
  numberOfTickets,
  totalPrice,
  handleViewOrders,
}) {
  const [mode, setMode] = React.useState("light");
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = React.useState(0);
  const [orderInfo, setOrderInfo] = React.useState({});
  const [open, setOpen] = useState(false); // State to control the dialog open/close
  const backButtonRef = useRef(null); // Ref for the "Back to Home" button

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleClose = () => {
    setOpen(false); // Close the dialog
    clickBackToHome();
  };
const clickBackToHome = () => {
    if (backButtonRef.current) {
      backButtonRef.current.click();
    }
  };
  const handlePlaceOrder = () => {
    // Log the order information
    setOpen(true);
    // console.log("Order Information:", formData);
    handleViewOrders(formData);
    // return (
    //   <ConfirmationPage
    //     eventName={eventData.name}
    //     eventDate={eventData.startDate}
    //     eventLocation={eventData.stadium.name}
    //     ticketType={eventData.type}
    //     totalPrice={totalPrice}
    //   />
    // );
    // Pass the order information to the parent component
    // onViewOrders(orderInfo);
  };

  // Function to update order information
  const updateOrderInfo = (newInfo) => {
    const updatedInfo = { ...orderInfo, ...newInfo };
    setOrderInfo(updatedInfo);
    console.log("Updated Order Information:", updatedInfo);
  };

  const handleAddressFormSubmit = (data) => {
    // Log the shipping address data
    console.log("Shipping Address Data:", data);
    // Update the order information with shipping address data
    updateOrderInfo(data);
    // Proceed to the next step
    handleNext();
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    cardNumber: "",
    paymentType: "",
    cvv: "",
    namepayment: "",
    ExpirationDate: "",
  });
  useEffect(() => {
    // console.log(formData);
  }, [formData]);

  const handleChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleHomeChange = (event) => {
    navigate("/");
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm handleChange={(e) => handleChange(e)} />;
      case 1:
        return <PaymentForm setFormData={setFormData} />;
      case 2:
        return <Review formData={formData} />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }}>
        <Grid
          item
          xs={12}
          sm={5}
          lg={4}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 4,
            px: 10,
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              height: 150,
            }}
          >
           <Button
           ref={backButtonRef}
              startIcon={<ArrowBackRoundedIcon />}
              component="a"
              href="http://localhost:3000"
              sx={{ ml: "-8px" }}
            >
              Back to Home Page
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info
              totalPrice={"$ " + totalPrice}
              eventData={eventData}
              numberOfTickets={numberOfTickets}
            />
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={7}
          lg={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "flex-end" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button
                startIcon={<ArrowBackRoundedIcon />}
                component="a"
                href="/material-ui/getting-started/templates/landing-page/"
                sx={{ alignSelf: "start" }}
              >
                Back to
              </Button>
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexGrow: 1,
                height: 150,
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{
                  width: "100%",
                  height: 40,
                }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-child": { pl: 0 },
                      ":last-child": { pr: 0 },
                    }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card
            sx={{
              display: { xs: "flex", md: "none" },
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                ":last-child": { pb: 2 },
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  {activeStep >= 2 ? "$144.97" : "$134.98"}
                </Typography>
              </div>
              <InfoMobile
                totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"}
              />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: "flex", md: "none" } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ":first-child": { pl: 0 },
                    ":last-child": { pr: 0 },
                    "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{
                      ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">🎫</Typography>
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography variant="body1" color="text.secondary">
                  Your Booking is Confirmed. We have emailed your Ticket
                  confirmation and will notify you once the event is about to
                  start
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handlePlaceOrder()}
                  sx={{
                    alignSelf: "start",
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  View Order QR Code
                </Button>
                
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    justifyContent:
                      activeStep !== 0 ? "space-between" : "flex-end",
                    alignItems: "end",
                    flexGrow: 1,
                    gap: 1,
                    pb: { xs: 12, sm: 0 },
                    mt: { xs: 2, sm: 0 },
                    mb: "60px",
                  }}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{
                        display: { xs: "none", sm: "flex" },
                      }}
                    >
                      Previous
                    </Button>
                  )}

                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{
                        display: { xs: "flex", sm: "none" },
                      }}
                    >
                      Previous
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    sx={{
                      width: { xs: "100%", sm: "fit-content" },
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <ConfirmationPage
            eventName={eventData.name}
            eventDate={eventData.startDate}
            eventLocation={eventData.stadium.name}
            ticketType={eventData.type}
            totalPrice={totalPrice}
            Price={totalPrice}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

Checkout.propTypes = {
  onViewOrders: PropTypes.func.isRequired,
};
