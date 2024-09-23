'use client'
{/* use client, components are server*/}

import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import MovieCarousel from '../components/MovieCarousel';
import LoginPage from './LoginPage';

export default function Home() {
    return (
        <div>
            
            <h1>Sign In</h1>
            <LoginPage />
        </div>
    );
}

