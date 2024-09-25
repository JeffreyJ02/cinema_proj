'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchResults from './searchResults';

const SearchResultsPage = () => {
    const [allMovies, setAllMovies] = useState([]); // State for all movies
    const [searchedMovie, setSearchedMovie] = useState(null); // State for the searched movie
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState(""); // State for search input
    const router = useRouter(); // Initialize useRouter

    useEffect(() => {
        const fetchAllMovies = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/movies');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                console.log("Fetched movies:", data); // Log the fetched movies
                setAllMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setError('Error fetching movies');
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllMovies();
    }, []);
     // Empty dependency array to run once on mount

    useEffect(() => {
        // Check if the router is ready before accessing query
        if (router.isReady) {
            const query = router.query.search; // Access query using the router
            if (query) {
                setSearchInput(query);
                handleSearch(query); // Call handleSearch with the query
            }
        }
    }, [router.query, router.isReady]); // Run when the query changes and when the router is ready

    const handleSearch = (query) => {
        if (query.trim() !== "") {
            // Convert search input to lowercase for case-insensitive comparison
            const foundMovie = allMovies.find(movie =>
                movie.title.toLowerCase() === query.toLowerCase()
            );
            setSearchedMovie(foundMovie || null); // Update searched movie state
        } else {
            setSearchedMovie(null); // Clear searched movie if input is empty
        }
    };

    if (loading) return <div>Loading...</div>; // Loading state
    if (error) return <div>{error}</div>; // Error state

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchInput); }}>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)} // Update search input state
                />
                <button type="submit">Search</button>
            </form>
            {searchedMovie ? (
                <SearchResults movies={[searchedMovie]} searchQuery={searchInput} /> // Pass the found movie as an array
            ) : (
                <p>No movie found</p> // Message if no movie matches
            )}
        </div>
    );
};

export default SearchResultsPage;
