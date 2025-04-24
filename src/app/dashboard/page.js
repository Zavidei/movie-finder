"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/navigation/NavBar';
import SearchResults from '@/components/search/SearchResults';
import { verifyToken } from '../lib/auth';

export default function Dashboard() {
    const router = useRouter();

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=5fd58718`);
            const data = await response.json();

            if (data.Response === "True") {
                setMovies(data.Search);
            } else {
                setError(data.Error);
                setMovies([]);
            }
        } catch (err) {
            setError("Произошла ошибка при поиске.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token || !verifyToken(token)) {
          router.push('/login');
        }
      }, []);

    return (
        <>
            <NavBar onSearch={handleSearch} query={query} setQuery={setQuery}/>
            <SearchResults loading={loading} error={error} movies={movies} />
        </>
    );
}