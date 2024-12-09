import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import axios from 'axios'; // Import axios for HTTP requests

const providers = [{ id: 'credentials', name: 'Email and Password' }];

export default function SlotPropsSignIn() {
  const theme = useTheme();

  // Handle sign-in
  const handleSignIn = async (provider, formData) => {
    try {
      // Extract email and password from the form
      const email = formData.get('email');
      const password = formData.get('password');

      // POST request to backend
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // Handle successful response
      const { token } = response.data;
      alert('Login successful');
      console.log('JWT Token:', token);

      // Store the JWT in localStorage
      localStorage.setItem('authToken', token);

      // Redirect user (if needed)
      window.location.href = '/dashboard'; // Example redirect after login
    } catch (error) {
      // Handle errors from the backend
      console.error(error.response?.data?.message || 'Error during login');
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={(provider, formData) => handleSignIn(provider, formData)}
        slotProps={{
          emailField: { variant: 'standard' },
          passwordField: { variant: 'standard' },
          submitButton: { variant: 'outlined' },
        }}
        providers={providers}
      />
    </AppProvider>
  );
}
