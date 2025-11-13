import { Box, Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, Typography } from "@mui/material";
import {
  InfoOutline as InfoOutlineIcon,
  DeleteOutline as DeleteOutlineIcon
} from "@mui/icons-material";
import { Movie } from "@/app/types/movies";

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
          width: {
            xs: "auto",
            sm: onDetailClick ? 250 : "auto"
          },
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
            component="img"
            image="https://www.vintagemovieposters.co.uk/wp-content/uploads/2019/06/IMG_9698.jpeg"
            alt={movie.title}
            sx={{
              height: 'auto',
              objectFit: 'cover',
            }}
          />
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
    </Grid>
  )
}
