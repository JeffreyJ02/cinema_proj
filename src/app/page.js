'use client';

import { useEffect, useState } from 'react';
import CustomNavbar from './components/CustomNavbar';
import MovieCarousel from './components/MovieCarousel';

export default function Home() {
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/movies');
        const data = await response.json();

        // Split movies into Now Showing and Coming Soon
        setNowShowingMovies(data.filter(movie => movie.category === 'Currently Running'));
        setComingSoonMovies(data.filter(movie => movie.category === 'Coming Soon'));
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <CustomNavbar />
      <MovieCarousel movies={nowShowingMovies} header="Now Playing" />
      <MovieCarousel movies={comingSoonMovies} header="Coming Soon" />
    </div>
  );
}

