import { Review } from "@/types/reviews";
import { axiosInstance } from "@/utils/axiosInstance";
import { AxiosResponse } from "axios";

export async function getReviewByMovieIdApi(movieId: string): Promise<Review[]> {
  const { data } = await axiosInstance.get<AxiosResponse<Review[]>>(`/api/reviews/movie/${movieId}`);
  return data.data;
}

export async function apiSaveReview(review: NewReview): Promise<Review> {
  const { data } = await axiosInstance.post<AxiosResponse<Review>>("/api/reviews", review);
  return data.data;
}

export async function apiDeleteReviewById(id: string): Promise<Review> {
  const { data } = await axiosInstance.delete<AxiosResponse<Review>>(`/api/reviews/${id}`);
  return data.data;
}
