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
import { useMutationSaveReview, useMutationUpdateReview } from "@/hooks/reviewHook";
import { useBoundStore } from "@/lib/useBondStore";

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
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState<number>(reviewToEdit?.rating ?? 0);

  const { showNoti } = useBoundStore();
  const { mutateAsync: saveReview } = useMutationSaveReview();
  const { mutateAsync: updateReview } = useMutationUpdateReview();

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
    setIsLoading(true);

    if (reviewToEdit) {
      const updated = {
        _id: reviewToEdit._id,
        movie: reviewToEdit.movie,
        review: data.review,
        rating,
      };
      try {
        const data = await updateReview(updated);
        console.log("update review success from review dialog", data);
        showNoti("Successfully update review.");
      } catch (err) {
        console.log("update review error from review dialog", err);
        showNoti("Failed to update review.");
      } finally {
        setIsLoading(false);
        reset();
        onClose();
      }
    } else {
      const newOne = {
        movie: movieId,
        review: data.review,
        rating,
      };
      try {
        const data = await saveReview(newOne);
        console.log("save review success from review dialog", data);
        showNoti("Successfully save review.");
      } catch (err) {
        console.log("save review error from review dialog", err);
        showNoti("Failed to save review.");
      } finally {
        setIsLoading(false);
        reset();
        onClose();
      }
    }
  };

  // const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
  // console.log("submit")
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
  // };

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
                disabled={isLoading}
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
                disabled={isLoading}
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
              disabled={isLoading}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              {
                isLoading
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
