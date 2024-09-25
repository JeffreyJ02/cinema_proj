'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const CustomNavbar = () => {
    const [allMovies, setAllMovies] = useState([]); // State for all movies
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState(""); // State for search input
    const router = useRouter(); // Initialize useRouter
    const [searchedMovie, setSearchedMovie] = useState(null);

    const signInButton = () => {
        router.push("/sign-in");
    };

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (searchInput.trim() !== "") {
            router.push(`/searchResults?search=${encodeURIComponent(searchInput)}`); // Push search query to the search results page
        }
    };

    useEffect(() => {
        // Check if the router is ready before accessing query
        if (router.isReady) {
            const query = router.query.search; // Access query using the router
            if (query) {
                setSearchInput(query);
                handleSearch(query); // Call handleSearch with the query
            }
        }
    }, [router.query, router.isReady]);

    {searchedMovie ? (
        <SearchResults movies={[searchedMovie]} searchQuery={searchInput} /> // Pass the found movie as an array
    ) : (
        <p>No movie found</p> // Message if no movie matches
    )}


    return (
        <Navbar expand="lg" className="bg-body-tertiary">

            <Container>
                <Navbar.Brand className="me-auto">
                    MovieSite
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto d-flex align-items-center">
                        <Form className="d-flex me-3" onSubmit={handleSearch}>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchInput} // Bind state to input field
                                onChange={(e) => setSearchInput(e.target.value)} // Update state on change
                            />
                            <Button type="submit" variant="primary">Search</Button>
                        </Form>
                        <NavDropdown
                            title={
                                <img
                                    src="/menu.svg"
                                    alt="Dropdown Icon"
                                    style={{ width: '20px', height: '20px' }}
                                />
                            }
                            id="basic-nav-dropdown"
                            align="end"
                        >
                            <NavDropdown.Item href="admin">Admin</NavDropdown.Item>
                            <NavDropdown.Item href="edit-profile">Edit Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/2">Manage Account</NavDropdown.Item>
                            <NavDropdown.Item href="#action/2">View Order History</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3">Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Button variant="primary" onClick={signInButton}>Sign In</Button>
            </Container>

        </Navbar>
    );
};

export default CustomNavbar;