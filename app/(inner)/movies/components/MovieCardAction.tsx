'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import MovieCard from "./MovieCard";
import { Movie } from "@/app/types/movies";
import { log } from "@/utils/logger";
import { useMutationDeleteMovieById } from "@/hooks/movieHook";
import { useBoundStore } from "@/lib/useBondStore";

interface MovieCardActionProps {
  movie: Movie;
}

export default function MovieCardAction({ movie }: MovieCardActionProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { showNoti } = useBoundStore();
  const { mutateAsync: deleteMovieById, isSuccess } = useMutationDeleteMovieById();

  // For ConfirmationDialog
  const handleClose = () => {
    setOpen(false);
  };

  // For MovieCard
  const handleDelete = () => {
    setOpen(true);
  };

  const handleDetailClick = () => {
    log("click");
    router.push(`/movies/${movie._id}`);
  }

  const handleDeleteConfirm = async () => {
    console.log("confirm");
    try {
      const data = await deleteMovieById(movie);
      log("delete movie success from movie card action", data);
      showNoti("Successfully delete movie.");
    } catch (err) {
      log("delete movie error from movie card action", err);
      showNoti("Failed to delete movie.");
    } finally {
      handleClose();
    }
  };

  const handleDeleteDecline = () => {
    log("decline");
    handleClose();
  }

  return (
    <>
      <ConfirmationDialog
        open={open}
        keepMounted={true}
        title={movie.title}
        message={"are you sure to delete?"}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteDecline}
      />
      <MovieCard
        movie={movie}
        onDetailClick={handleDetailClick}
        onDelete={handleDelete}
      />
    </>
  )
}
