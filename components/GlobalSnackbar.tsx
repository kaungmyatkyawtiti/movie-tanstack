"use client";

import { useBoundStore } from "@/lib/useBondStore";
import { Snackbar } from "@mui/material";

export default function GlobalSnackbar() {
  const message = useBoundStore(state => state.message);
  const { hideNoti } = useBoundStore();

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom"
      }}
      open={!!message}
      autoHideDuration={3000}
      onClose={hideNoti}
      message={message}
      sx={{
        maxWidth: { xs: '65%' }
      }}
    />
  )
}
