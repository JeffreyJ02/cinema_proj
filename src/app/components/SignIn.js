"use client";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { hash } from '../../utils/encryption';

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
      const encryptedPassword = hash(password);
      // Sending API call to login endpoint
      const response = await fetch("http://localhost:8080/api/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: encryptedPassword, rememberMe }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown Login Error");
      }

      const data = await response.json();
      setSuccessMessage("Login successful! Redirecting..."); // Set success message
      localStorage.setItem('userEmail', email);

      // Check if this is correct for the admin page
      console.log("data.admin: ", data.admin);
      if (data.admin == 1) {
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
    <Container 
      maxWidth={false} 
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw", 
      }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          width: "66%",
          maxWidth: "500px",
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
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
