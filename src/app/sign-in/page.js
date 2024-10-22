<<<<<<< HEAD
import React from 'react';
import SignIn from '../components/SignIn';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export default function HomePage() {
  return (
    <Card>
      <SignIn />
    </Card>
  );
};
=======
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
>>>>>>> 08ed4dfb12621abd49534bd94b622244b3839e1b
