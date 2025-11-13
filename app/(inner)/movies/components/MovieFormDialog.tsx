import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import z from 'zod';
import { Movie } from "@/app/types/movies";
import { movieSchema } from "@/utils/schema";

interface MovieFormDialogProps {
  open: boolean;
  onClose: () => void;
  movieToEdit?: Movie;
}

type MovieFormData = z.infer<typeof movieSchema>;

export default function MovieFormDialog({
  open,
  onClose,
  movieToEdit,
}: MovieFormDialogProps) {
  const defaultValues = useMemo(() => ({
    title: "",
    director: {
      name: "",
      phoneNo: ""
    },
    year: undefined,
  }), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues
  })

  useEffect(() => {
    reset(movieToEdit ?? defaultValues);
  }, [movieToEdit, defaultValues, reset]);

  const isSubmitting = true;

  const onSubmit: SubmitHandler<MovieFormData> = async (data) => {
    console.log("submit")
    // try {
    //   // log(data);
    //   if (!movieToEdit) {
    //     const newMovie = data;
    //     const response = await saveMovie(newMovie).unwrap();
    //
    //     log("new movie successfully saved", response);
    //     dispatch(showSnackbar("New movie saved successfully!"));
    //   } else {
    //     const updated: Movie = {
    //       _id: movieToEdit._id,
    //       title: data.title,
    //       year: data.year,
    //       director: {
    //         _id: movieToEdit.director._id,
    //         name: data.director.name,
    //         phoneNo: data.director.phoneNo,
    //       },
    //     };
    //
    //     const response = await updateMovie(updated).unwrap();
    //
    //     log("successfully updated", response);
    //     dispatch(showSnackbar("Movie updated successfully!"));
    //   }
    // } catch (err) {
    //   logError("fail to save/update movie", err);
    //   dispatch(showSnackbar("Failed to save/update movie"));
    // } finally {
    //   reset();
    //   onClose();
    // }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            maxHeight: '100vh',
            width: '100%',
            maxWidth: 500,
          },
        },
      }}
    >
      <DialogTitle
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {
          movieToEdit
            ? "Edit Movie"
            : "New Movie"
        }
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {
            movieToEdit
              ? "Update the movie's information."
              : "Add a new movie by entering its title, director, and release year."
          }
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Grid size={12}>
              <TextField
                type="text"
                margin="dense"
                fullWidth
                variant="filled"
                label="Title"
                {...register("title")}
                helperText={errors.title?.message}
                error={!!errors.title}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                type="text"
                margin="dense"
                fullWidth
                variant="filled"
                label="Director name"
                {...register("director.name")}
                helperText={errors.director?.name?.message}
                error={!!errors.director?.name}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                type="text"
                margin="dense"
                fullWidth
                variant="filled"
                label="Director phoneNo"
                {...register("director.phoneNo")}
                helperText={errors.director?.phoneNo?.message}
                error={!!errors.director?.phoneNo}
                disabled={isSubmitting}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                type="number"
                margin="dense"
                fullWidth
                variant="filled"
                label="Year"
                {...register("year")}
                helperText={errors.year?.message}
                error={!!errors.year}
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
  )
}
