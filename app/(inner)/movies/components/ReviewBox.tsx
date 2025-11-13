import { Box, Typography } from "@mui/material";
import ReviewEntry from "./ReviewEntry";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import ReviewCardAction from "./ReviewCardAction";
import { useGetReviewByMovieId } from "@/hooks/reviewHook";

export default function ReviewBox({ id }: { id: string }) {
  const { data: reviews, isError, isLoading, isSuccess, refetch, isFetching } = useGetReviewByMovieId(id);

  if (isLoading) return <ReviewCardSkeleton />;

  if (isError) return <Box>Error loading reviews</Box>;

  return (
    <Box mt={2}>
      <ReviewEntry movieId={id} />
      {
        isSuccess && reviews && reviews.length > 0
          ? (
            <Box display="flex" flexDirection="column" gap={2}>
              {
                reviews.map((review) =>
                  <ReviewCardAction
                    key={review._id}
                    review={review} />
                )
              }
            </Box>
          )
          : (
            <Typography color="text.secondary">
              No reviews found for this movie.
            </Typography>
          )
      }
    </Box>
  );
}
