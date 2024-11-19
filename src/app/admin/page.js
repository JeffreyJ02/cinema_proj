'use client'
import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar';

export default function Home() {
  return (
    <div>
      <CustomNavbar />
      <h1>Admin Page</h1>
      <Button variant="primary" href="admin/manage-movies">Manage Movies</Button>
      <Button variant="primary" href="admin/manage-promo">Manage Promotions</Button>
      <Button variant="primary" href="admin/manage-users">Manage Users</Button>
      <Button variant="primary" href="admin/manage-showing">Manage Showing Times</Button>
      <Button variant="primary" href="/">Back To Home</Button>
    </div>
  );
}