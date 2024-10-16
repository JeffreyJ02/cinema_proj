"use client";

import React, { useState } from 'react';
// sends movie name and returns img link from database
export default function Home() { 
    const [movieName, setMovieName] = useState('');
    const [imgLink, setImgLink] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8082/api/search?title=${movieName}`);
            if (response.ok) {
                const link = await response.json();
                setImgLink(link.description);
                setError(null);
            } else {
                setImgLink(null);
                setError('Movie not found');
            }
        } catch (err) {
            console.error('Error fetching movie:', err);
            setError('An unexpected error occurred.');
        }
    };
    return (
        <div>
            <h1>Tester Page</h1>
            <form>
                <input type="text" value={movieName} onChange={(e) => setMovieName(e.target.value)} placeholder="Movie Name" required/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            {imgLink && (
                <div>
                    <h2>Movie Image:</h2>
                    <p>{imgLink}</p>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};