"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Typography,
  Checkbox,
  Link,
  Container,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CookiesProvider, useCookies } from "react-cookie";

// This component is adapted from the Material-UI example at: https://mui.com/material-ui/getting-started/templates/sign-in/
export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    if (successMessage) {
      router.push("/");
    }
  }, [successMessage, router]);

  const validateInputs = () => {
    // Validation from sample code
    let isValid = true;

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!formData.password || formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, rememberMe } = formData;
    if (!validateInputs()) return;
    /*
    const dummyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6InVzZXIiLCJleHAiOjE5MDAwMDAwMDB9._dummy-signature_"
    setCookie('token', dummyToken, { 
      path: '/',
      maxAge: 3600,
      secure: true,
      sameSite: 'strict',
    });
    console.log("Dummy JWT set") */
    try {
      // Sending API call to login endpoint
      const response = await fetch("http://localhost:8080/api/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown Login Error");
      }

      const data = await response.json();
      setSuccessMessage("Login successful! Redirecting..."); // Set success message

      // Check if this is correct for the admin page
      console.log("data.administrator: ", data.administrator);
      if (data.administrator == 1) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Log In
        </Typography>

        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%", mt: 1 }}
        >
          <Grid xs="auto">
            <Typography>Email</Typography>
          </Grid>
        </Grid>

        <TextField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          required
          autoFocus
          helperText={emailError}
          error={emailError}
          placeholder="your@email.com"
          variant="outlined"
        />

        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%", mt: 1 }}
        >
          <Grid xs="auto">
            <Typography>Password</Typography>
          </Grid>
          <Grid xs="auto">
            <Link href="/password-reset" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>

        <TextField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          helperText={passwordError}
          error={passwordError}
          fullWidth
          required
          variant="outlined"
          placeholder="••••••"
          color={passwordError ? "error" : "primary"}
          sx={{ mt: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rememberMe}
              onChange={handleInputChange}
              name="rememberMe"
              color="primary"
            />
          }
          label="Remember me"
          sx={{ alignSelf: "flex-start", mt: 1 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <Typography sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link href="/sign-up" variant="body2">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
