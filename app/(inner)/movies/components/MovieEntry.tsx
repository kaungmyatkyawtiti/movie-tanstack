'use client';

import {
  Box,
  Button,
} from "@mui/material";

import {
  Add as AddIcon
} from "@mui/icons-material";

import { useState } from "react"
import MovieFormDialog from "./MovieFormDialog";

export default function MovieEntry() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          my: 5
        }}
      >
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          sx={{
            bgcolor: 'success.main',
            '&:hover': {
              bgcolor: 'success.dark',
            },
            color: 'white',
          }}
        >
          New Movie
        </Button>
      </Box>

      <MovieFormDialog
        open={open}
        onClose={handleClose}
      />
    </>
  )
}
