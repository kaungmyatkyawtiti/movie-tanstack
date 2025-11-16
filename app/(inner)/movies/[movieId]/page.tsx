// 'use client';
//
// import { useParams, useRouter } from "next/navigation";
// import MovieCard from "../components/MovieCard";
// import { Box, Button, IconButton, Typography } from "@mui/material";
// import {
//   Movie as MovieIcon,
//   ArrowBack as ArrowBackIcon
// } from "@mui/icons-material";
// import { useState } from "react";
// import MovieFormDialog from "../components/MovieFormDialog";
// import ReviewBox from "../components/ReviewBox";
// import MovieCardSkeleton from "../components/MovieCardSkeleton";
// import ReviewCardSkeleton from "../components/ReviewCardSkeleton";
//
// function MovieDetailPage() {
//   const router = useRouter();
//   const { id } = useParams<{ id: string }>();
//
//   //cache 
//   const { movie: cachedMovie } = useGetAllMoviesQuery(undefined, {
//     selectFromResult: ({ data }) => ({
//       movie: data?.find(item => item._id === id),
//     }),
//   });
//
//   // fetch by ID if not in cache
//   const { data: movieById } = useGetMovieByIdQuery(id, { skip: !!cachedMovie });
//
//   const movie = cachedMovie || movieById;
//
//   const [open, setOpen] = useState(false);
//
//   const handleClickOpen = () => setOpen(true);
//
//   const handleClose = () => setOpen(false);
//
//   const handleEdit = () => handleClickOpen();
//
//   const handleBack = () => router.push("/movies");
//
//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       padding={5}
//     >
//       <Box
//         position="relative"
//         width="100%"
//         maxWidth={600}
//       >
//         <Box display="flex" alignItems="center" gap={1} mb={2}>
//           <IconButton
//             color="error"
//             edge="start"
//             onClick={handleBack}
//           >
//             <ArrowBackIcon />
//           </IconButton>
//           <MovieIcon fontSize="large" color="action" />
//           <Typography variant="h5" fontWeight={600} color="text.secondary">
//             Movie Details
//           </Typography>
//         </Box>
//
//         <Box position="relative">
//           {
//             movie
//               ? <MovieCard movie={movie} />
//               : <MovieCardSkeleton />
//           }
//           <Button
//             variant="contained"
//             size="small"
//             sx={{ my: 2 }}
//             onClick={handleEdit}
//             disabled={!movie}
//           >
//             Edit
//           </Button>
//
//           {
//             movie
//               ? <ReviewBox id={id} />
//               : <ReviewCardSkeleton />
//           }
//         </Box>
//         <MovieFormDialog
//           open={open}
//           onClose={handleClose}
//           movieToEdit={movie}
//         />
//       </Box>
//     </Box>
//   )
// }
//
// export default MovieDetailPage;

'use client'

import { useGetMovieById } from '@/hooks/movieHook';
import { use } from 'react'
import MovieCard from "../components/MovieCard";
import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  Movie as MovieIcon,
  ArrowBack as ArrowBackIcon
} from "@mui/icons-material";
import { useState } from "react";
import MovieFormDialog from "../components/MovieFormDialog";
import ReviewBox from "../components/ReviewBox";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import ReviewCardSkeleton from "../components/ReviewCardSkeleton";
import { useRouter } from 'next/navigation';

export default function MovieDetailPage({
  params,
}: {
  params: Promise<{ movieId: string }>
}) {
  const router = useRouter();

  const { movieId } = use(params);

  console.log("movieId", movieId);

  const movie = useGetMovieById(movieId);

  // if (!movie) return <div>Product not found</div>;

  console.log("movie", movie);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleEdit = () => handleClickOpen();

  const handleBack = () => router.push("/movies");

  return (
    <Box
      display="flex" flexDirection="column"
      alignItems="center"
      padding={5}
    >
      <Box
        position="relative"
        width="100%"
        maxWidth={600}
      >
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <IconButton
            color="error"
            edge="start"
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <MovieIcon fontSize="large" color="action" />
          <Typography variant="h5" fontWeight={600} color="text.secondary">
            Movie Details
          </Typography>
        </Box>

        <Box position="relative">
          {
            movie
              ? <MovieCard movie={movie} />
              : <MovieCardSkeleton />
          }
          <Button
            variant="contained"
            size="small"
            sx={{ my: 2 }}
            onClick={handleEdit}
            disabled={!movie}
          >
            Edit
          </Button>

          {
            movie
              ? <ReviewBox id={movieId} />
              : <ReviewCardSkeleton />
          }
        </Box>
        <MovieFormDialog
          open={open}
          onClose={handleClose}
          movieToEdit={movie}
        />
      </Box>
    </Box>
  )
}
