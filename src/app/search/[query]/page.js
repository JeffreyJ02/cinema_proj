"use client";

import { useEffect, useState } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import MovieCarousel from "../../components/MovieCarousel";
import { Box, CircularProgress } from "@mui/material";

export default function Home({ params }) {
  let { query } = params;
  query = query.replace(/%20/g, " ");

  const isDate = (str) => {
    console.log("IsDate: ", str);
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(str)) return false;
    console.log("Date!");
    return true;
  };

  const isCategory = (str) => {
    let categories = [
      "action",
      "animation",
      "drama",
      "sci-fi",
      "comedy",
      "adventure",
      "crime",
    ];
    console.log("IsCategory: ", str);
    if (categories.includes(str)) {
      console.log("Category!");
      return true;
    };
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
        `http://localhost:8080/api/get-movie-ids-by-showdate?showDate=${query}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const movieIds = await response.json();

      const movieDetails = await Promise.all(
        movieIds.map(async (id) => {
          const movieResponse = await fetch(
            `http://localhost:8080/api/search-by-id?id=${id}`
          );
          if (!movieResponse.ok) {
            throw new Error(`Failed to fetch movie with ID: ${id}`);
          }
          return movieResponse.json();
        })
      );

      console.log("Fetched movie details:", movieDetails);
      setMovieList(movieDetails);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoviesByGenre = async () => {
    try {
      console.log("Trying to fetch movies by category:", `http://localhost:8080/api/search-by-genre?genre=${encodeURIComponent(
        query
      )}`);
      const response = await fetch(
        `http://localhost:8080/api/search-by-genre?genre=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const data = await response.json();
      console.log("Fetched movies by category:", data);
      setMovieList(data);
    } catch (error) {
      console.error("Error fetching movies by category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isDate(query)) {
      fetchMoviesByDate();
    } else if (isCategory(query)) {
      fetchMoviesByGenre();
    } else {
      fetchMovies();
    }
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
