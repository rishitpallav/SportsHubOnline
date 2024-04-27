import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Sports
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.getAll("firstName"));
    try {
      const response = await fetch("http://localhost:4000/registerCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.getAll("firstName")[0] + " " + data.getAll("lastName")[0],
          email: data.getAll("email")[0],
          password: data.getAll("password")[0],
          preferences: data.getAll("sports")[0],
          addressLine: data.get("AddressLine")[0],
          city: data.getAll("City")[0],
          state: data.getAll("State")[0],
          country: data.getAll("Country")[0],
          postalCode: data.getAll("Postalcode")[0],
        }),
      });

      if (response.ok) {
        // Handle successful signup
        const dataresponse = {
          name: data.getAll("firstName")[0] + " " + data.getAll("lastName")[0],
          email: data.getAll("email")[0],
        };
        const serializedData = JSON.stringify(dataresponse);
        localStorage.setItem("userData", serializedData);
        localStorage.setItem("username", data.getAll("firstName")[0] + " " + data.getAll("lastName")[0]);
        
        // console.log(data.credentials.email);
        localStorage.setItem("email", data.getAll("email")[0]);
        const retrievedData = localStorage.getItem("username");
        console.log(retrievedData);
        console.log("Signup successful");
        toast.success("Signup successful");
        navigate("/");
      } else {
        // Handle failed signup
        console.error("Signup failed");
        toast.error("Signup failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred");
    }
  };

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="AddressLine"
                  label="Address Line"
                  type="AddressLine"
                  id="AddressLine"
                  autoComplete="Address Line"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="City"
                  label="City"
                  type="City"
                  id="City"
                  autoComplete="City"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="State"
                  label="State"
                  type="State"
                  id="State"
                  autoComplete="State"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Country"
                  label="Country"
                  type="Country"
                  id="Country"
                  autoComplete="Country"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Postalcode"
                  label="Postal code"
                  type="Postalcode"
                  id="Postalcode"
                  autoComplete="Postal code"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "2px" }}>
              {/* Existing form fields */}
              {/* Add new dropdown for sports */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="sports-label">Select Sports</InputLabel>
                  <Select
                    labelId="sports-label"
                    id="sports"
                    name="sports"
                    multiple
                    required
                    label="Select Sports"
                    defaultValue={[]}
                    inputProps={{
                      name: "sports",
                      id: "select-sports",
                    }}
                  >
                    <MenuItem value="Soccer">Soccer</MenuItem>
                    <MenuItem value="Football">Football</MenuItem>
                    <MenuItem value="Baseball">Baseball</MenuItem>
                    <MenuItem value="Basketball">Basketball</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}
