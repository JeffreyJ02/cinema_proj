'use client'

import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import EditProfile from '../components/EditProfile';

export default function Home() {
    return (
        <div>
            <CustomNavbar />
            <EditProfile />
        </div>
    );
}