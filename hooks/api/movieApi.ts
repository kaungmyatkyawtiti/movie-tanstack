import { Movie, NewMovie } from "@/types/movies";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosResponse } from "axios";

export async function getAllMoviesApi(): Promise<Movie[]> {
  const { data } = await axiosInstance.get<AxiosResponse<Movie[]>>("api/movies");
  return data.data;
}

// export async function apiGetMovieById(id: string): Promise<Movie> {
//   const { data } = await axiosInstance.get<AxiosResponse<Movie>>(`api/movies/${id}`);
//   return data.data;
// }

export async function saveMovieApi(movie: NewMovie): Promise<Movie> {
  const { data } = await axiosInstance.post<AxiosResponse<Movie>>(`api/movies`, movie);
  return data.data;
}

export async function updateMovieByIdApi(movie: Movie): Promise<Movie> {
  const { data } = await axiosInstance.put<AxiosResponse<Movie>>(`api/movies/${movie._id}`, movie);
  return data.data;
}

export async function deleteMovieByIdApi(id: string): Promise<Movie> {
  const { data } = await axiosInstance.delete<AxiosResponse<Movie>>(`api/movies/${id}`);
  return data.data;
}
