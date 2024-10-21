"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Container,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [isMounted, setIsMounted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  useEffect(() => {
    setIsMounted(true); // Set to true when mounted
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
        // Sending API call to login endpoint
        const response = await fetch('http://localhost:8080/api/login-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Unknown Login Error');
        }

        const data = await response.json();
        console.log('Login successful:', data);

        // Here we should save the token to local storage
        localStorage.setItem('token', data.token);
        setSuccessMessage("Login successful! Redirecting..."); // Set success message
        isMounted && router.push('/'); // Redirect after successful login

        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(error.message); // Set error message for user feedback
            setSuccessMessage(''); // Clear success message on error
        }
    };

  if (!isMounted) return null;

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Log In
        </Typography>

        <Grid container alignItems="center" justifyContent="space-between" sx={{ width: '100%', mt: 1 }}>
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
          placeholder='your@email.com'
          variant="outlined"
        />

        <Grid container alignItems="center" justifyContent="space-between" sx={{ width: '100%', mt: 1 }}>
          <Grid xs="auto">
            <Typography>Password</Typography>
          </Grid>
          <Grid xs="auto">
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>

        <TextField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          required
          variant="outlined"
          placeholder="••••••"
          sx={{ mt: 1 }}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Log In
        </Button>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        <Typography sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link href="/sign-up" variant="body2">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
