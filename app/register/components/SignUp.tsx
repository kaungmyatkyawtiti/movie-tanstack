'use client';

import {
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginX: "2rem",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        color='primary'
        sx={{
          textAlign: "center",
          fontWeight: 600,
          fontSize: "2rem",
        }}
      >
        Register Your Account
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{
          maxWidth: "450px",
        }}
      >
        <TextField
          label="Username"
          type="text"
          variant="outlined"

          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"

          fullWidth
          margin="normal"
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
        />

        {/* <FormControlLabel */}
        {/*   control={<Checkbox value="remember" color="primary" />} */}
        {/*   label="I agree to the terms and conditions" */}
        {/* /> */}

        <Box>
          <Link
            href="/login"
          >
            <Typography
              color='primary'
              sx={{
                display: "block",
                my: 2,
                cursor: "pointer",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Already have an account? Sign in
            </Typography>
          </Link>

          <Button type="submit" variant="contained">
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
