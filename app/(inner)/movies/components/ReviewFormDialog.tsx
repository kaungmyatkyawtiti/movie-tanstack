import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Rating,
  TextField,
} from "@mui/material";

import { SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Star as StarIcon } from "@mui/icons-material";
import { Review } from "@/app/types/reviews";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "@/utils/schema";

interface ReviewFormDialogProps {
  open: boolean;
  onClose: () => void;
  movieId: string;
  reviewToEdit?: Review;
}

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function ReviewFormDialog({
  open,
  onClose,
  movieId,
  reviewToEdit,
}: ReviewFormDialogProps) {
  // Rating
  const [rating, setRating] = useState<number>(reviewToEdit?.rating ?? 0);

  // hookform
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: reviewToEdit?.review ?? "",
    },
  });

  useEffect(() => {
    reset({
      review: reviewToEdit?.review ?? "",
    });
    setRating(reviewToEdit?.rating ?? 0);
  }, [reviewToEdit]);

  const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    console.log("submit")
    // try {
    //   if (reviewToEdit) {
    //     const updated = {
    //       _id: reviewToEdit._id,
    //       movie: reviewToEdit.movie,
    //       review: data.review,
    //       rating,
    //     };
    //     const response = await updateReview(updated).unwrap();
    //     log("successfully updated", response);
    //     dispatch(showSnackbar("Review updated successfully!"));
    //   } else {
    //     const newOne = {
    //       movie: movieId,
    //       review: data.review,
    //       rating,
    //     };
    //     const response = await saveReview(newOne).unwrap();
    //     log("new review successfully saved", response);
    //     dispatch(showSnackbar("New review saved successfully!"));
    //   }
    // } catch (err) {
    //   logError("fail to save/update review", err);
    //   dispatch(showSnackbar("Failed to save/update review"));
    // } finally {
    //   reset();
    //   onClose();
    // }
  };

  // const isSubmitting = saveReviewResult.isLoading || updateReviewResult.isLoading;
  const isSubmitting = true;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      slotProps={{
        paper: {
          sx: { maxHeight: "100vh", width: "100%", maxWidth: 500 },
        },
      }}
    >
      <DialogTitle
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: 500,
          gap: 1,
        }}
      >
        {
          reviewToEdit ? "Edit Review" : "New Review"
        }
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {
            reviewToEdit
              ? "Update the review's information."
              : "Add a new review by choosing a rating and entering your review."
          }
        </DialogContentText>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            sx={{ mt: 3 }}
          >
            <Grid size={12}>
              <Rating
                name="rating"
                value={rating}
                precision={0.5}
                onChange={(event, newValue) => {
                  setRating(newValue ?? 0);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                disabled={isSubmitting}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                variant="filled"
                label="Review"
                margin="dense"
                {...register("review")}
                helperText={errors.review?.message}
                error={!!errors.review}
                disabled={isSubmitting}
              />
            </Grid>
          </Grid>

          <DialogActions>
            <Button
              onClick={onClose}
              sx={{
                color: "red"
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
              }}

            >
              {
                isSubmitting
                  ? (
                    <>
                      <CircularProgress size={20} />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )
              }
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
