'use client';

import { Box, Stack } from "@mui/material";
import MovieList from "./components/MovieList";
import MovieEntry from "./components/MovieEntry";
import { useState } from 'react';
import CustomLoading from "@/components/CustomLoading";
import CenteredMessage from "@/components/CenteredText";
import MovieBanner from "./components/MovieBanner";
import { log } from "@/utils/logger";
import { useGetAllMovies } from "@/hooks/movieHook";

function MoviePage() {
  const { data, isSuccess, isError, isPending, isLoading, refetch } = useGetAllMovies();

  log("fetching all movies", data);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleBlur = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  const handleRefresh = async () => {
    log("refresh");

    setIsRefreshing(true);

    const delay = new Promise((resolve, reject) =>
      setTimeout(resolve, 2000)
    );

    await Promise.all([refetch(), delay]);

    setIsRefreshing(false);
    handleBlur();
  };

  const isSpinning = isLoading || isRefreshing;

  return (
    <Box p={4}>
      <MovieBanner
        isRefreshing={isRefreshing}
        handleRefresh={handleRefresh}
      />
      <Box>
        <MovieEntry />
        {
          isSpinning && <CustomLoading height={"50vh"} />
        }
        {
          isError && isSpinning &&
          <CenteredMessage color="error">
            Error loading movies. Please try again.
          </CenteredMessage>
        }
        {
          isSuccess && !isRefreshing && (
            data?.length === 0
              ? <CenteredMessage color="text.secondary">No movies found.</CenteredMessage>
              : (
                <Stack
                  direction="row"
                  spacing={2}
                  useFlexGap
                  sx={{
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <MovieList movies={data} />
                </Stack>
              )
          )
        }
      </Box>
    </Box >
  )
}

export default MoviePage;
