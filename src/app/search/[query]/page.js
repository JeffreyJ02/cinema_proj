"use client";

import { useEffect, useState } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import MovieCarousel from "../../components/MovieCarousel";
import { Box, CircularProgress } from "@mui/material";
export default function Home({ params }) {
  let { query } = params;
  query = query.replace(/%20/g, " ");

  const isDate = (str) => {
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(str)) return false;
  };


  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async (title) => {
    console.log(
      `http://localhost:8080/api/search-by-title?title=${encodeURIComponent(
        query
      )}`
    );
    try {
      const response = await fetch(
        `http://localhost:8080/api/search-by-title?title=${encodeURIComponent(
          query
        )}`
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

  const fetchMoviesByDate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/get-movie-ids-by-showdate?date=${query}`
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
  }
    

  useEffect(() => {
    isDate(query) ? fetchMoviesByDate() : fetchMovies();
  }, []);

  if (loading) return (
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
        {movieList.length > 0 ? (
          <MovieCarousel
            movies={movieList}
            header={`Results for query "${query}"`}
          />
        ) : (
          <p>Nothing Found for that Query</p>
        )}
      </Box>
    </div>
  );
}
