'use client'
{/* use client, components are server*/}

import React from 'react';
import CustomNavbar from './components/CustomNavbar';
import MovieCarousel from './components/MovieCarousel';

export default function Home() {
  return (
    <div>
      <CustomNavbar />
      <MovieCarousel header="Now Playing"/>
      <MovieCarousel header="Coming Soon"/>
    </div>
  );
}
