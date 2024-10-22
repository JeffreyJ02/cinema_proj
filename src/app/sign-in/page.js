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
