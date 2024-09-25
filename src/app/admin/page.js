'use client'
import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // For demo purposes, assume admin credentials are "admin@gmail.com", "password", and "123"
    if (email === 'admin@gmail.com' && password === 'password' && adminKey === '123') {
      setIsLoggedIn(true);
    } else {
      setError('Invalid email, password, or admin key');
    }
  };
  //once logged in then these buttons will appear
  if (isLoggedIn) {
    return (
      <div>
        <CustomNavbar />
        <h1>Admin Page</h1>
        <Button variant="primary" href="admin/manage-movies">Manage Movies</Button>
        <Button variant="primary" href="admin/manage-promo">Manage Promotions</Button>
        <Button variant="primary" href="admin/manage-users">Manage Users</Button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <label>Admin Key:</label>
          <input type="text" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} />
          <br />
          <button type="submit">Login</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
      </div>
    );
  }
}