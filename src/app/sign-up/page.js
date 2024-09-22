'use client'

import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import MovieCarousel from '../components/MovieCarousel';
import LoginForm from '../components/LoginForm';
import SignUpPage from './SignUpPage';

export default function Home() {
    return (
        <div>
            <CustomNavbar />
            <h1>Sign Up</h1>
            <SignUpPage />
        </div>
    );
}