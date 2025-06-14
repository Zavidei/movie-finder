"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/navigation/NavBar';
import { Container, Typography, Grid, Box, IconButton } from "@mui/material";
import { verifyToken } from '../lib/auth';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Favorites() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = verifyToken(token);
    if (!userData) {
      router.push("/login");
      return;
    }

    fetch("/api/favorites", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(err => console.error("Ошибка при загрузке избранного:", err));
  }, []);

  const removeFavorite = async (imdbID) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const res = await fetch("/api/favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ imdbID }),
    });

    const data = await res.json();
    if (res.ok) {
      setFavorites(prev => prev.filter(movie => movie.imdbID !== imdbID));
    } else {
      console.error("Ошибка при удалении:", data.error);
    }
  };

  return (
    <>
      <NavBar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Featured Movies</Typography>
        <Grid container spacing={3}>
          {favorites.map(movie => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
              <Box
                sx={{
                  position: 'relative',
                  '&:hover .delete-button': {
                    opacity: 1,
                  }
                }}
              >
                <img src={movie.Poster} alt={movie.Title} style={{ width: '100%', maxHeight: 300, borderRadius: 8 }} />
                <Typography sx={{ mt: 1, textAlign: 'center' }}>{movie.Title}</Typography>

                <IconButton
                  className="delete-button"
                  onClick={() => removeFavorite(movie.imdbID)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'text.muted',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    '&:hover': {
                      backgroundColor: 'text.secondary',
                      color: 'white',
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
