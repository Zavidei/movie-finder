"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/navigation/NavBar';
import { Container, Typography, Grid, Box } from "@mui/material";
import { verifyToken } from '../lib/auth';

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
  

    return (
        <>
        <NavBar/>
        <Container sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Избранные фильмы</Typography>
          <Grid container spacing={3}>
            {favorites.map(movie => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
                <Box sx={{ textAlign: 'center' }}>
                  <img src={movie.Poster} alt={movie.Title} style={{ width: '100%', maxHeight: 300, borderRadius: 8 }} />
                  <Typography sx={{ mt: 1 }}>{movie.Title}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </>
    );
}