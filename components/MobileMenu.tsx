"use client";

import { IconButton } from "@mui/material";
import {
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useState } from "react";
import MobileNav from "./MobileNav";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        sx={{
          display: { xs: "flex", md: "none" }
        }}
        color="inherit"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <MobileNav
        open={open}
        onCloseMenu={() => setOpen(!open)}
      />
    </>

  )
}
