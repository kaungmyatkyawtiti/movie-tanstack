'use client';

import {
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { InferType } from 'yup';
import { useAppDispatch } from '@/lib/hooks';
import { login } from '@/lib/features/auth/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { log, logError } from '@/app/utils/logger';
import { showSnackbar } from '@/lib/features/snackbar/snackbarSlice';
import useAuth from '@/app/auth/useAuth';
import Link from 'next/link';
import { userSchema } from '@/lib/schemas';

type FormData = InferType<typeof userSchema>;

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirectUrl");

  const dispatch = useAppDispatch();
  const isAuth = useAuth();

  useEffect(() => {
    log("effect run and isAuth is ", isAuth);
    if (isAuth) {
      router.replace("/dashboard");
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // const onSubmit: SubmitHandler<FormData> = async (data) => {
  const onSubmit = async (data: FormData) => {
    log("Sign in data:", data);

    try {
      const result = await dispatch(login(data)).unwrap();
      log("success", result);
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push("/dashboard");
      }

      dispatch(showSnackbar("Successfully login."));
    } catch (err) {
      logError("login failed", err);

      const errMsg = err as string;
      const fields: (keyof FormData)[] = ["username", "password"];
      fields.forEach(field => {
        setError(field, {
          type: "server",
          message: errMsg,
        });
      });
      dispatch(showSnackbar("Failed to login!"));
    } finally {
      reset(
        { username: "", password: "" },
        { keepErrors: true }
      );
    }
  };

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
        variant="h4"
        component="h1"
        gutterBottom
        color='primary'
        sx={{
          textAlign: "center",
          fontWeight: 600,
          fontSize: "2rem"
        }}
      >
        Login Your Account
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          maxWidth: "450px",
        }}
      >
        <TextField
          {...register("username")}
          label="Username"
          type="text"
          variant="outlined"

          error={!!errors.username}
          helperText={errors.username?.message}
          fullWidth
          margin="normal"
        />

        <TextField
          {...register("password")}
          label="Password"
          type="password"

          error={!!errors.password}
          helperText={errors.password?.message}
          variant="outlined"
          fullWidth
          margin="normal"
        />

        {/* <FormControlLabel */}
        {/*   control={<Checkbox value="remember" color="primary" />} */}
        {/*   // label="I agree to the terms and conditions" */}
        {/*   label="Remember Me" */}
        {/* /> */}

        <Box>
          <Link
            href="/register"
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
              Don’t have an account? Create one
            </Typography>
          </Link>

          <Button type="submit" variant="contained">
            Sign in
          </Button>
        </Box>
      </Box>
    </Box >
  );
}
