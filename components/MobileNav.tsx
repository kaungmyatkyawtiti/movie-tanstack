import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navItems } from "./Navbar";

interface MobileNavProps {
  open: boolean;
  onCloseMenu: () => void;
}

export default function MobileNav({
  open,
  onCloseMenu,
}: MobileNavProps) {
  const pathname = usePathname();

  const handleBlur = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  const handleClose = () => {
    onCloseMenu();
    handleBlur();
  }

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onCloseMenu}
    >
      <Box
        sx={{
          width: 280,
          height: 70,
          bgcolor: "primary.main",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography
          color="primary.contrastText"
          variant="h5"
          fontWeight="bold"
        >
          My Movie
        </Typography>
      </Box>
      <List>
        {
          navItems.map(({ label, href, Icon }) => (
            <ListItem
              key={href}
              disablePadding
            >
              <ListItemButton
                LinkComponent={Link}
                href={href}
                selected={pathname === href}
                onClick={handleClose}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: pathname === href ? "primary.main" : "inherit",
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  slotProps={{
                    primary: {
                      fontWeight: pathname === href ? "bold" : "normal",
                      color: pathname === href ? "primary" : "inherit",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    </Drawer>
  )
}
