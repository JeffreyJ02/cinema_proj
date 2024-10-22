'use client'

import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import PasswordReset from './passwordReset';

export default function Home(){
    return (
        <div>
            <h1>Password Reset</h1>
            <PasswordReset />
        </div>

    );
}
