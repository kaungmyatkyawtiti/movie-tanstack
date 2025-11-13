import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Refresh as RefreshIcon
} from "@mui/icons-material";

interface MovieBannerProps {
  isRefreshing: boolean;
  handleRefresh: () => void;
}

export default function MovieBanner({
  isRefreshing,
  handleRefresh,
}: MovieBannerProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 3
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: {
            xs: '1.8rem',
            sm: '2.2rem',
          },
        }}
      >
        🎬 My Movie Collections
      </Typography>
      {
        isSmallScreen
          ? (
            // round icon button for small screens
            <IconButton
              onClick={handleRefresh}
              size="medium"
              sx={{
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                color: 'white',
              }}
            >
              <RefreshIcon />
            </IconButton>
          )
          : (
            // full button for larger screens
            <Button
              variant="contained"
              size="small"
              startIcon={<RefreshIcon />}
              sx={{
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                color: 'white',
              }}
              onClick={handleRefresh}
            >
              Refresh
            </Button>
          )
      }
    </Box>
  )
}
