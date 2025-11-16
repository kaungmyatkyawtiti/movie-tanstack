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
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { log } from '@/utils/logger';
import { userSchema } from '@/utils/schema';
import { useBoundStore } from '@/lib/useBondStore';
import useAuth from '@/hooks/useAuth';

type FormData = InferType<typeof userSchema>;

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { login } = useBoundStore();

  const redirectUrl = searchParams.get("redirectUrl");

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

  const onSubmit = async (data: FormData) => {
    log("Sign in data:", data);
    try {
      const result = await login(data);
      log("login success from SignIn", result);
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.log("login error from SignIn", err, "err instance of Error", err instanceof Error);

      const errMsg = err instanceof Error ? err.message : err as string;

      const fields: (keyof FormData)[] = ["username", "password"];
      fields.forEach(field => {
        setError(field, {
          type: "server",
          message: errMsg,
        });
      });
    } finally {
      reset(
        { username: "", password: "" },
        { keepErrors: true }
      );
    }

    // try {
    //   const result = await dispatch(login(data)).unwrap();
    //   log("success", result);
    //   if (redirectUrl) {
    //     router.push(redirectUrl);
    //   } else {
    //     router.push("/dashboard");
    //   }
    //
    //   dispatch(showSnackbar("Successfully login."));
    // } catch (err) {
    //   logError("login failed", err);
    //
    //   const errMsg = err as string;
    //   const fields: (keyof FormData)[] = ["username", "password"];
    //   fields.forEach(field => {
    //     setError(field, {
    //       type: "server",
    //       message: errMsg,
    //     });
    //   });
    //   dispatch(showSnackbar("Failed to login!"));
    // } finally {
    //   reset(
    //     { username: "", password: "" },
    //     { keepErrors: true }
    //   );
    // }
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
