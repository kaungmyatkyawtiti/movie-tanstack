'use client';

import { useState } from "react";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import ReviewCard from "./ReviewCard";
import ReviewFormDialog from "./ReviewFormDialog";
import { Review } from "@/app/types/reviews";
import { log } from "@/utils/logger";
import { useMutationDeleteReview } from "@/hooks/reviewHook";
import { useBoundStore } from "@/lib/useBondStore";

interface ReviewCardActionProps {
  review: Review;
}

export default function ReviewCardAction({
  review,
}: ReviewCardActionProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { showNoti } = useBoundStore();
  const { mutateAsync: deleteReview, isSuccess } = useMutationDeleteReview();

  // edit dialog 
  const handleEdit = () => {
    log("edit");
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  // delete dialog 
  const handleDelete = () => {
    log("delete");
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = async () => {
    console.log("confirm");
    try {
      const data = await deleteReview(review);
      console.log("delete review success from review card action", data);
      showNoti("Successfully delete review.");
    } catch (err) {
      console.log("delete review error from review card action", err);
      showNoti("Failed to delete review.");
    } finally {
      handleDeleteClose();
    }
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
