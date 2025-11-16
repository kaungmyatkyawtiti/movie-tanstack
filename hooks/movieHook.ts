import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteMovieByIdApi, getAllMoviesApi, saveMovieApi, updateMovieByIdApi } from "./api/movieApi"
import { log, logError } from "@/utils/logger";
import { Movie, NewMovie } from "@/types/movies";
import { queryClient } from "@/components/Providers";

export const useGetAllMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: getAllMoviesApi,
    refetchOnWindowFocus: false,
  })
}

export const useGetMovieById = (movieId: string) => {
  console.log("movieId from useGetMovieById", movieId);
  const data = queryClient.getQueryData<Movie[]>(['movies']);
  console.log("data from useGetMovieById", data);
  return data?.find(movie => movie._id === movieId);
};

export const useMutationSaveMovie = () => {
  return useMutation({
    mutationFn: (movie: NewMovie) => saveMovieApi(movie),

    onSuccess: (newOne: NewMovie) => {
      log("save movie onSuccess", newOne);

      queryClient.setQueryData(
        ["movies"],
        (oldState: Movie[]) => [...oldState, newOne]
      )
    },
    onSettled: (newOne, error, variables, onMutateResult) => {
      log("save Movie onSettled", newOne);
    },
  });
}

export const useMutationUpdateMovieById = () => {
  return useMutation({
    mutationFn: (movie: Movie) => updateMovieByIdApi(movie),

    onMutate: async (updated: Movie) => {
      await queryClient.cancelQueries({ queryKey: ['movies'] });

      const previous = queryClient.getQueryData(['movies']);

      queryClient.setQueryData(
        ["movies"],
        (oldState: Movie[]) => oldState.map(m => m._id === updated._id ? updated : m)
      )

      return { previous };
    },
    onSuccess: (movie, variables, onMutateResult) => {
      console.log("movie update onSuccess", movie);
    },
    onError: (err, movie, onMutateResult) => {
      console.log("movie update onError", err, movie);
      queryClient.setQueryData(
        ['movies'],
        onMutateResult?.previous
      )
    },
    onSettled: (updated, error, variables, onMutateResult) => {
      console.log("movie update onSettled", updated)
    },
  });
}

// Pessimistic Update
// export const useMutationDeleteMovieById = () => {
//   return useMutation({
//     mutationFn: (movie: Movie) => apiDeleteMovieById(movie._id),
//
//     onSuccess: async (deletedMovie: Movie) => {
//       log("I'm onSuccess!", deletedMovie);
//
//       // queryClient.invalidateQueries({ queryKey: ["movies"] });
//       queryClient.setQueriesData(
//         { queryKey: ["movies"] },
//         (oldState: Movie[]) => oldState.filter(m => m._id != deletedMovie._id)
//       )
//     },
//
//     onSettled: async () => {
//       log("I'm onSettled!")
//     },
//   });
// }

// Optimistic Update
export const useMutationDeleteMovieById = () => {
  return useMutation({
    mutationFn: (movie) => deleteMovieByIdApi(movie._id),

    onMutate: async (movie: Movie) => {
      await queryClient.cancelQueries({ queryKey: ['movies'] });

      const previous = queryClient.getQueryData(['movies']);

      queryClient.setQueryData(
        ["movies"],
        (oldState: Movie[]) => oldState.filter(m => m._id != movie._id)
      )

      return { previous };
    },
    // promise then(success case)
    onSuccess: (movie, variables, onMutateResult) => {
      console.log("movie delete onSuccess", movie, variables, onMutateResult);
    },
    // promise catch(error case)
    onError: (err, movie, onMutateResult) => {
      console.log("movie delete onError", err);
      queryClient.setQueryData(
        ['movies'],
        onMutateResult?.previous
      )
    },
    // promise finally(do whatever case)
    onSettled: (movie, error, variables, onMutateResult) => {
      console.log("movie delete onSettled", movie, variables, onMutateResult);
    },
  });
}
