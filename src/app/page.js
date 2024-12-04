"use client";

import { useEffect, useState } from "react";
import CustomNavbar from "./components/CustomNavbar";
import MovieCarousel from "./components/MovieCarousel";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function Home() {
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/movies");
        const data = await response.json();

        // Split movies into Now Showing and Coming Soon
        setNowShowingMovies(
          data.filter((movie) => movie.category === "Currently Running")
        );
        setComingSoonMovies(
          data.filter((movie) => movie.category === "Coming Soon")
        );
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <div>
      <CustomNavbar />
      <Box sx={{ margin: "20px auto", maxWidth: "90%" }}>
        <MovieCarousel movies={nowShowingMovies} header="Now Playing" />
      </Box>
      <Box sx={{ margin: "20px auto", padding: "40px 0", maxWidth: "90%" }}>
        <MovieCarousel movies={comingSoonMovies} header="Coming Soon" />
      </Box>
    </div>
  );
}
