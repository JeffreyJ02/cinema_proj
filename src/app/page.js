'use client'
import React from 'react';
import CustomNavbar from './components/CustomNavbar';
import MovieCarousel from './components/MovieCarousel';

export default function Home() {
  return (
    <div>
      <CustomNavbar />
      <MovieCarousel />
    </div>
  );
}
