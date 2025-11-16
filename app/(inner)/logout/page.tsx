'use client';

import { Box, Button } from "@mui/material";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import ConfirmationDialog from "@/components/ConfirmDialog";
import { log } from "@/utils/logger";
import { useBoundStore } from "@/lib/useBondStore";

function LogoutPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { logout } = useBoundStore();

  const showConfirmDialog = () => {
    setOpen(true);
  }

  // For ConfirmationDialog
  const handleClose = () => {
    setOpen(false);
  };

  const handleDecline = () => {
    log("decline");
    handleClose();
  }

  const handleConfirm = () => {
    try {
      logout();
      // dispatch(showSnackbar("Successfully logout."));
      router.push("/login");
    } catch (err) {
      log("logout error", err);
    } finally {
      handleClose();
    }
  };

  return (
    <Box sx={{ m: 4 }}>
      <ConfirmationDialog
        open={open}
        keepMounted={true}
        title={"Logout this account"}
        message={"are you sure to Logout?"}
        onConfirm={handleConfirm}
        onCancel={handleDecline}
      />
      <Button
        variant="contained"
        onClick={showConfirmDialog}>
        Logout
      </Button>
    </Box>
  )
}

export default LogoutPage;
