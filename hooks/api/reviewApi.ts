import { NewReview, Review } from "@/types/reviews";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosResponse } from "axios";

export async function getReviewApi(movieId: string): Promise<Review[]> {
  const { data } = await axiosInstance.get<AxiosResponse<Review[]>>(`/api/reviews/movie/${movieId}`);
  return data.data;
}

export async function saveReviewApi(review: NewReview): Promise<Review> {
  const { data } = await axiosInstance.post<AxiosResponse<Review>>("/api/reviews", review);
  return data.data;
}

export async function updateReviewApi(review: Review): Promise<Review> {
  const { data } = await axiosInstance.put<AxiosResponse<Review>>(`api/reviews/${review._id}`, review);
  return data.data;
}

export async function deleteReviewApi(id: string): Promise<Review> {
  const { data } = await axiosInstance.delete<AxiosResponse<Review>>(`/api/reviews/${id}`);
  return data.data;
}
