import { Box, Typography } from "@mui/material";

interface CenteredMessageProps {
  children: React.ReactNode;
  color?: string;
};

const CenteredMessage = ({
  children,
  color
}: CenteredMessageProps) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
      px: 2,
      textAlign: 'center'
    }}
  >
    <Typography color={color}>
      {children}
    </Typography>
  </Box>
);

export default CenteredMessage;
