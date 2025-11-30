import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteReviewApi, getReviewApi, saveReviewApi, updateReviewApi } from "./api/reviewApi";
import { log, logError } from "@/utils/logger";
import { NewReview, Review } from "@/types/reviews";
import { queryClient } from "@/components/Providers";

export const useGetReview = (movieId: string) => useQuery({
  queryKey: ['reviews', movieId],
  queryFn: () => getReviewApi(movieId),
  refetchOnWindowFocus: false,
});

export const useMutationSaveReview = () => useMutation({
  mutationFn: (review: NewReview) => saveReviewApi(review),

  onSuccess: (newOne: NewReview) => {
    log("save review onSuccess!", newOne);

    queryClient.setQueryData(
      ["reviews", newOne.movie],
      (oldState: Review[]) => [...oldState, newOne]
    )
  },
  onSettled: (newOne, error, variables, onMutateResult) => {
    log("save review onSettled", newOne);
  },
});

export const useMutationUpdateReview = () => useMutation({
  mutationFn: (review: Review) => updateReviewApi(review),

  onMutate: async (updated: Review) => {
    await queryClient.cancelQueries({ queryKey: ['reviews', updated.movie] });

    const previous = queryClient.getQueryData(['reviews', updated.movie]);

    queryClient.setQueryData(
      ["reviews", updated.movie],
      (oldState: Review[]) => oldState.map(rw => rw._id === updated._id ? updated : rw)
    )

    return { previous };
  },

  onSuccess: (updated) => {
    log("save review onSuccess!", updated);
  },
  onError: (err, updated, onMutateResult) => {
    console.log("movie update onError", err, updated);
    queryClient.setQueryData(
      ['reviews', updated.movie],
      onMutateResult?.previous
    )
  },
  onSettled: (updated, error, variables, onMutateResult) => {
    log("save review onSettled", updated);
  },
});

export const useMutationDeleteReview = () => useMutation({
  mutationFn: (review: Review) => deleteReviewApi(review._id),

  onMutate: async (review: Review) => {
    await queryClient.cancelQueries({ queryKey: ['reviews', review.movie] });

    const previous = queryClient.getQueryData(["reviews", review.movie]);

    queryClient.setQueriesData(
      { queryKey: ["reviews", review.movie] },
      (oldState: Review[]) => oldState.filter(rw => rw._id != review._id)
    )

    return { previous };
  },
  onSuccess: (deleted) => {
    log("delete review onSuccess", deleted);
  },
  onError: (error, deleted, onMutateResult) => {
    log(error);
    queryClient.setQueryData(
      ["reviews", deleted.movie],
      onMutateResult?.previous
    );
  },
  onSettled: (deleted) => {
    log("delete review onSettled", deleted)
  },
});
