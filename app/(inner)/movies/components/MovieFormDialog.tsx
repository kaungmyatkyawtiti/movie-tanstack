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
import { useEffect, useMemo, useState } from "react";
import z from 'zod';
import { Movie } from "@/app/types/movies";
import { movieSchema } from "@/utils/schema";
import { useMutationSaveMovie, useMutationUpdateMovieById } from "@/hooks/movieHook";
import { log } from "@/utils/logger";
import { useBoundStore } from "@/lib/useBondStore";

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
  const [isLoading, setIsLoading] = useState(false);
  const defaultValues = useMemo(() => ({
    title: "",
    director: {
      name: "",
      phoneNo: ""
    },
    year: undefined,
  }), []);

  const { showNoti } = useBoundStore();
  const { mutateAsync: saveMovie } = useMutationSaveMovie();
  const { mutateAsync: updateMovie } = useMutationUpdateMovieById();

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

  const onSubmit: SubmitHandler<MovieFormData> = async (data) => {
    setIsLoading(true);
    if (!movieToEdit) {
      try {
        const result = await saveMovie(data);
        console.log("save movie success from movie dialog", result);
        showNoti("Successfully save movie.");
      } catch (err) {
        console.log("save movie error from movie dialog", err);
        showNoti("Failed to save movie.");
      } finally {
        setIsLoading(false);
        reset();
        onClose();
      }
    } else {
      const updated: Movie = {
        _id: movieToEdit._id,
        title: data.title,
        year: data.year,
        director: {
          _id: movieToEdit.director._id,
          name: data.director.name,
          phoneNo: data.director.phoneNo,
        },
      };
      try {
        const result = await updateMovie(updated);
        console.log("update movie success from movie dialog", result);
        showNoti("Successfully update movie.");
      } catch (err) {
        console.log("update movie error from movie dialog", err);
        showNoti("Failed to update movie.");
      } finally {
        setIsLoading(false);
        reset();
        onClose();
      }
    }
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
  )
}
