'use client'
import React from 'react';
import { Button } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar'; // Assuming this is the original navbar
import './styles.css';

export default function Home() {
  return (
    <div className="admin-page">
      <h1>Admin Hub</h1>
      <div className="button-container">
        <Button variant="primary" className="admin-button" href="admin/manage-movies">Manage Movies</Button>
        <Button variant="primary" className="admin-button" href="admin/manage-promo">Manage Promotions</Button>
        <Button variant="primary" className="admin-button" href="admin/manage-showing">Manage Showing Times</Button>
      </div>
      <Button className="back-button" href="/">Back To Home</Button>
    </div>
  );
}


