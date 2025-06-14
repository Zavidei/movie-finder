"use client";
import { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Typography, Grid, Container, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export default function SearchResults({ loading, error, movies, favorites = [], setFavorites }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (loading) return <Typography sx={{ padding: 2 }}>Загрузка...</Typography>;
  if (error) return <Typography sx={{ padding: 2, color: 'error.main' }}>{error}</Typography>;

  const favoriteIDs = new Set(favorites.map(fav => fav.imdbID));

  const handleOpenModal = async (movie) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=5fd58718&i=${movie.imdbID}&plot=full`);
    const data = await res.json();
    setSelectedMovie(data);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMovie(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Grid container spacing={3} justifyContent="center">
        {movies.map((movie) => {
          const isFavorite = favoriteIDs.has(movie.imdbID);

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
              <Box sx={{ textAlign: 'center', position: 'relative' }}>
                <Box
                  component="img"
                  src={movie.Poster}
                  alt={movie.Title}
                  sx={{
                    width: '100%',
                    maxHeight: 300,
                    objectFit: 'cover',
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={() => handleOpenModal(movie)}
                />

                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'background.paper',
                    color: isFavorite ? 'text.secondary' : 'text.disabled',
                    transition: 'opacity 0.3s, color 0.3s',
                    opacity: 0,
                    '&:hover': {
                      backgroundColor: 'text.secondary',
                      color: '#fff'
                    },
                    '.MuiBox-root:hover &': {
                      opacity: 1
                    }
                  }}
                  onClick={async () => {
                    if (isFavorite) return;

                    const token = localStorage.getItem("authToken");
                    const res = await fetch("/api/favorites", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                      },
                      body: JSON.stringify({
                        imdbID: movie.imdbID,
                        Title: movie.Title,
                        Poster: movie.Poster
                      })
                    });

                    if (res.ok) {
                      console.log("Фильм добавлен в избранное:", movie.Title);
                      setFavorites(prev => [...prev, {
                        imdbID: movie.imdbID,
                        Title: movie.Title,
                        Poster: movie.Poster
                      }]);
                    } else {
                      console.error("Ошибка при добавлении в избранное");
                    }
                  }}
                >
                  <FavoriteIcon />
                </IconButton>

                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  {movie.Title}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: 'background.main',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'text.main',
          }}
        >
          {selectedMovie?.Title}
          <Button onClick={handleCloseModal} sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'text.primary'
            }
          }} >
            Close
    </Button>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: 'background.main' }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          <Box
            component="img"
            src={selectedMovie?.Poster}
            alt={selectedMovie?.Title}
            sx={{
              width: 250,
              height: 'auto',
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Описание:</strong> {selectedMovie?.Plot}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Год выпуска:</strong> {selectedMovie?.Year}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Актеры:</strong> {selectedMovie?.Actors}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Жанры:</strong> {selectedMovie?.Genre}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>

        </Container >
    );
}
