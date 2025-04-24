"use client";
import {  Box, Typography, Grid, Container, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function SearchResults({ loading, error, movies }) {
    if (loading) {
        return <Typography sx={{ padding: 2 }}>Загрузка...</Typography>;
    }

    if (error) {
        return <Typography sx={{ padding: 2, color: 'error.main' }}>{error}</Typography>;
    }
    

    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            <Grid container spacing={3} justifyContent="center">
                {movies.map((movie) => (
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
                            />
                
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    backgroundColor: 'text.muted',
                                    opacity: 0,
                                    transition: 'opacity 0.3s',
                                    '&:hover': {
                                        backgroundColor: 'text.secondary',
                                        color: '#fff'
                                    },
                                    '.MuiBox-root:hover &': {
                                        opacity: 1
                                    }
                                }}
                                onClick={async () => {
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
                ))}
            </Grid>
        </Container>
    );
}