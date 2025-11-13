'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import MovieCard from "./MovieCard";
import { Movie } from "@/app/types/movies";
import { log } from "@/utils/logger";

interface MovieCardActionProps {
  movie: Movie;
}

export default function MovieCardAction({ movie }: MovieCardActionProps) {
  const [targetId, setTargetId] = useState<string | null>(null);

  const router = useRouter();

  const [open, setOpen] = useState(false);

  // For ConfirmationDialog
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirm = async (id: string) => {
    // try {
    //   const result = await deleteMovie(id).unwrap();
    //   log("successfully deleted", result);
    //   dispatch(showSnackbar("Movie deleted successfully!"));
    // } catch (error) {
    //   logError("delete error", error);
    //   dispatch(showSnackbar("Failed to delete movie."));
    // } finally {
    //   handleClose();
    // }
    console.log("confirm");
  };

  const handleDeleteDecline = () => {
    log("decline");
    handleClose();
  }

  // For MovieCard
  const handleDelete = (movie: Movie) => {
    setTargetId(movie._id);
    setOpen(true);
  };

  const handleDetailClick = (movie: Movie) => {
    log("click");
    router.push(`/movies/${movie._id}`);
  }

  return (
    <>
      <ConfirmationDialog
        open={open}
        keepMounted={true}
        title={movie.title}
        message={"are you sure to delete?"}
        onConfirm={() => targetId && handleDeleteConfirm(targetId)}
        onCancel={handleDeleteDecline}
      />
      <MovieCard
        movie={movie}
        // onShowConfirmDialog={handleShowConfirmDialog}
        onDetailClick={() => handleDetailClick(movie)}
        onDelete={() => handleDelete(movie)}
      />
    </>
  )
}
