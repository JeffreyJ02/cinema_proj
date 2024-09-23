'use client'

import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import EditProfile from './EditProfile';

export default function Home() {
    return (
        <div>
            <CustomNavbar />
            <h1>Edit Profile</h1>
            <EditProfile />
        </div>
    );
}