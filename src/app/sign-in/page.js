'use client'
{/* use client, components are server*/}

import LoginPage from './LoginPage';

export default function Home() {
    return (
        <div>
            
            <h1>Sign In</h1>
            <LoginPage />
        </div>
    );
}