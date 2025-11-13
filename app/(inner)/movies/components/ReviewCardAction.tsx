'use client';

import { useState } from "react";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import ReviewCard from "./ReviewCard";
import ReviewFormDialog from "./ReviewFormDialog";
import { Review } from "@/app/types/reviews";
import { log } from "@/utils/logger";

interface ReviewCardActionProps {
  review: Review;
}

export default function ReviewCardAction({
  review,
}: ReviewCardActionProps) {
  const [targetReview, setTargetReview] = useState<Review | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // edit dialog 
  const handleEdit = () => {
    log("edit");
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  // delete dialog 
  const handleDelete = (review: Review) => {
    log("delete");
    setTargetReview(review);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = async () => {
    // if (!targetReview) return;
    //
    // try {
    //   const result = await deleteReview(targetReview).unwrap();
    //   log("successfully deleted", result);
    //   dispatch(showSnackbar("Review deleted successfully!"));
    // } catch (error) {
    //   logError("delete error", error);
    //   dispatch(showSnackbar("Failed to delete review."));
    // } finally {
    //   handleDeleteClose();
    // }
    console.log("confirm");
  };

  return (
    <>
      <ReviewFormDialog
        open={editOpen}
        onClose={handleEditClose}
        movieId={review.movie}
        reviewToEdit={review}
      />

      <ConfirmationDialog
        open={deleteOpen}
        keepMounted
        title="Delete this comment"
        message="Are you sure you want to delete this review?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteClose}
      />

      <ReviewCard
        review={review}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
}
