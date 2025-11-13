'use client';

import { Box, Card, CardContent, Skeleton } from "@mui/material";

export default function MovieCardSkeleton() {
  return (
    <Box>
      <Card
        sx={{
          width: "100%",
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: "whitesmoke"
        }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={500}
        />
        <CardContent>
          <Skeleton
            animation="wave"
            variant="text"
            height={40}
            width="80%"
            sx={{ mb: 1 }}
          />
          <Skeleton
            animation="wave"
            variant="text"
            height={30} width="60%"
            sx={{ mb: 1 }}
          />
          <Skeleton
            animation="wave"
            variant="text"
            height={30}
            width="50%"
            sx={{ mb: 1 }}
          />
          <Skeleton
            animation="wave"
            variant="text"
            height={30}
            width="40%"
          />
        </CardContent>
      </Card>
    </Box>
  );
}
