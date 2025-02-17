import Slider from "react-slick";
import MovieCard from "./MovieCard";
import {
  FormControl,
  Box,
  Typography,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState, useMemo } from "react";

const MovieCarousel = ({ movies, header }) => {
  const [filter, setFilter] = useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredMovies = useMemo(() => {
    if (!filter) return movies;
    return movies.filter((movie) => movie.genre === filter);
  }, [filter, movies]);

  const settings = {
    centerPadding: "90px",
    infinite: filteredMovies.length > 1,
    speed: 500,
    slidesToShow: Math.min(filteredMovies.length, 5),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(filteredMovies.length, 3),
          slidesToScroll: 1,
          infinite: filteredMovies.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(filteredMovies.length, 1),
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">{header}</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Filters</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Genre"
            onChange={handleChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Action">Action</MenuItem>
            <MenuItem value="Animation">Animation</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
            <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
            <MenuItem value="Comedy">Comedy</MenuItem>
            <MenuItem value="Adventure">Adventure</MenuItem>
            <MenuItem value="Crime">Crime</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Slider {...settings}>
        {filteredMovies./*filter((movie) => movie.playing === movie.header).*/ map(
          (movie) => (
            <MovieCard key={movie.id} movie={movie} />
          )
        )}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
