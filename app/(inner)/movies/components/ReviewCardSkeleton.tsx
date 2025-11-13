'use client';

import { Card, CardContent, Divider, Skeleton } from "@mui/material";

export default function ReviewCardSkeleton() {
  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: 2,
        boxShadow: 1,
        mb: 2,
        bgcolor: "whitesmoke"
      }}
    >
      <CardContent>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={50}
        />

        <Divider sx={{ my: 1 }} />

        <Skeleton
          animation="wave"
          height={40}
        />
      </CardContent>
    </Card>
  );
}
