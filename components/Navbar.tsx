"use client";

import {
  Button,
  Stack,
} from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home as HomeIcon,
  LiveTv as LiveTvIcon,
  Logout as LogoutIcon,
  SpaceDashboard as DashboardIcon
} from "@mui/icons-material";

export const navItems = [
  { label: "Home", href: "/", Icon: HomeIcon },
  { label: "Dashboard", href: "/dashboard", Icon: DashboardIcon },
  { label: "Movies", href: "/movies", Icon: LiveTvIcon },
  { label: "Logout", href: "/logout", Icon: LogoutIcon },
]
export default function Navbar() {
  const pathname = usePathname();

  const handleBlur = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        display: { xs: "none", md: "flex" }
      }}
    >
      {
        navItems.map((item) => (
          <Button
            key={item.href}
            LinkComponent={Link}
            href={item.href}
            startIcon=<item.Icon fontSize="small" />
            onClick={handleBlur}
            sx={{
              px: 1,
              color: pathname === item.href ? "#fff" : "#e0e0e0",
              fontWeight: pathname === item.href ? "bold" : "normal",
              backgroundColor:
                pathname === item.href
                  ? "rgba(255,255,255,0.15)"
                  : "transparent",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            {item.label}
          </Button>
        ))
      }
    </Stack>
  );
}
