import { Box, Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, Typography } from "@mui/material";
import {
  InfoOutline as InfoOutlineIcon,
  DeleteOutline as DeleteOutlineIcon
} from "@mui/icons-material";
import { Movie } from "@/app/types/movies";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie,
  onDetailClick?: () => void;
  onDelete?: () => void;
}

export default function MovieCard({
  movie,
  onDetailClick,
  onDelete,
}: MovieCardProps) {
  return (
    <Grid>
      <Card
        sx={{
          width: onDetailClick ? 250 : "auto",
          ...(onDetailClick && {
            "&:hover": {
              boxShadow: 3,
              cursor: "pointer",
            },
          }),
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        <Box>
          <CardMedia
            sx={{
              position: "relative",
              overflow: "hidden",
              ...(onDetailClick
                ? {
                  height: 350,
                }
                : {
                  height: 550,
                }),
            }}
          >
            <Image
              src="/movie.jpg"
              alt={movie.title}
              fill
              sizes="auto"
              priority
              style={{
                objectFit: "cover",
                objectPosition: "bottom",
              }}
            />
          </CardMedia>
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              noWrap={!!onDetailClick}
              sx={{
                mb: 1,
              }}
            >
              {movie.title}
            </Typography>

            <Typography
              variant="subtitle2"
              noWrap={!!onDetailClick}
              sx={{ my: 1 }}>
              Director: {movie.director.name}
            </Typography>

            <Typography
              variant="subtitle2"
              display="block"
              sx={{ mb: 1 }}
            >
              Contact: {movie.director.phoneNo}
            </Typography>

            <Typography
              variant="subtitle2"
            >
              Year: {movie.year}
            </Typography>
          </CardContent>
        </Box>
        {
          onDelete && onDetailClick &&
          <>
            <Divider />
            <CardActions>
              <IconButton
                size="medium"
                color="info"
                onClick={onDetailClick}
                aria-label="click for detail info"
                title="detail info">
                <InfoOutlineIcon />
              </IconButton>

              <IconButton
                size="medium"
                color="error"
                onClick={onDelete}
                aria-label="delete movie"
                title="Delete movie">
                <DeleteOutlineIcon />
              </IconButton>
            </CardActions>
          </>
        }
      </Card>
    </Grid >
  )
}
