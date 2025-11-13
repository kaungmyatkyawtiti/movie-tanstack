'use client';

import { Grid } from "@mui/material";
import { Movie } from "@/app/types/movies";
import MovieCardAction from "./MovieCardAction";

interface MovieListProps {
  movies: Movie[];
}
export default function MovieList({ movies }: MovieListProps) {
  return (
    <Grid
      container
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={{ xs: 2, md: 3 }}
    >
      {
        movies.map(movie => <MovieCardAction key={movie._id} movie={movie} />)
      }
    </Grid>
  )
}
