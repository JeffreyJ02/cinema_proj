'use client'
{/* use client, components are server*/}

import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import MovieCarousel from '../components/MovieCarousel';
import LoginForm from '../components/LoginForm';
import LoginPage from './LoginPage';


export default function Home() {
    return (
        <div>
            <CustomNavbar />
            <h1>Sign In</h1>
            <LoginPage />
        </div>
    );
}

