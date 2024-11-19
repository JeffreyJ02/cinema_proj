"use client";

import { useEffect, useState } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import MovieCarousel from "../../components/MovieCarousel";

export default function Home({ params }) {
  const { query } = params;

  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async (title) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/search?title=${query}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const data = await response.json();
      console.log("Fetched movies:", data);
      setMovieList(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <CustomNavbar />
      <MovieCarousel movies={movieList} header={`Results for query "${query}"`} />
    </div>
  );
}
