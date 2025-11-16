"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, Typography } from '@mui/material';
import { log } from "@/utils/logger";
import useAuth from "@/hooks/useAuth";

function AuthCheckLoading() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant='h4'>
        Checking Auth
      </Typography>
    </Box>
  )
}

export default function IsAuth<T>(
  Component: React.ComponentType<T>
) {
  return (props: T) => {
    const router = useRouter();
    const isAuth = useAuth();
    const pathname = usePathname();

    log('Path name ', pathname);

    useEffect(() => {
      log("Effect ran, isAuth:", isAuth, "pathname:", pathname);

      const loginUrl = `/login?redirectUrl=${pathname}`;
      if (!isAuth) return router.replace(loginUrl);
    }, []);

    if (!isAuth) {
      return <AuthCheckLoading />;
    }

    return (
      <>
        <Component {...props!} />
      </>
    );
  };
}
