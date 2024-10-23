'use client'

import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import MovieCarousel from '../components/MovieCarousel';
import LoginForm from '../components/LoginForm';
import SignUpPage from '../components/SignUp';

export default function Home() {
    return (
        <div>
            <CustomNavbar />
            <SignUpPage />
        </div>
    );
}