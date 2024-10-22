"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CookiesProvider, useCookies } from 'react-cookie';

// This component is adapted from the Material-UI example at: https://mui.com/material-ui/getting-started/templates/sign-in/
export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [isMounted, setIsMounted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cookies, setCookie] = useCookies(['token']);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  useEffect(() => {
    setIsMounted(true); // Set to true when mounted
  }, []);

  useEffect(() => {
    if (successMessage) {
      router.push('/');
    }
  }, [successMessage, router]);

  const validateInputs = () => { // Validation from sample code
    let isValid = true;

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!formData.password || formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, rememberMe } = formData;
    if (!validateInputs()) return;

    try {
        // Sending API call to login endpoint
        const response = await fetch('http://localhost:8080/api/login-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, rememberMe }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Unknown Login Error');
        }

        const data = await response.json();
        setSuccessMessage("Login successful! Redirecting..."); // Set success message

        console.log("data.administrator: ", data.administrator);
        if (data.administrator == 1) {
          router.push('/admin');
        } else {
          router.push('/');
        }

        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };

    /*
    import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    // Simulate user authentication (replace with real authentication logic)
    private boolean authenticateUser(String email, String password) {
        return "user@example.com".equals(email) && "password123".equals(password);
    }

    @PostMapping("/login-user")
    public ResponseEntity<?> loginUser(
            @RequestBody Map<String, String> requestBody,
            HttpServletResponse response) {

        String email = requestBody.get("email");
        String password = requestBody.get("password");
        boolean rememberMe = Boolean.parseBoolean(requestBody.get("rememberMe"));

        if (!authenticateUser(email, password)) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }

        // Generate JWT token with 1 hour expiration
        long expiration = rememberMe ? (30L * 24 * 60 * 60 * 1000) : (60 * 60 * 1000); // 30 days or 1 hour
        String token = JwtUtil.generateToken(email, expiration);

        // Create the cookie
        Cookie jwtCookie = new Cookie("token", token);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true); // Ensure this is true in production (HTTPS)
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(rememberMe ? (30 * 24 * 60 * 60) : -1); // 30 days or session cookie

        // Add the cookie to the response
        response.addCookie(jwtCookie);

        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "Login successful!");

        return ResponseEntity.ok(responseBody);
    }
}

    */
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
          helperText={emailError}
          error={emailError}
          placeholder='your@email.com'
          variant="outlined"
        />

        <Grid container alignItems="center" justifyContent="space-between" sx={{ width: '100%', mt: 1 }}>
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
          color={passwordError ? 'error' : 'primary'}
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
          sx={{ alignSelf: 'flex-start', mt: 1 }}
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
