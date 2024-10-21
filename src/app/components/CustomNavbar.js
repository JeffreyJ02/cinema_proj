'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const CustomNavbar = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const signInButton = () => {
        router.push("/sign-in");
    };

    useEffect(() => {
        const token = localStorage.getItem('token'); // Make sure to use the correct token key
        setIsLoggedIn(!!token); // If token exists, set isLoggedIn to true
    }, []);

    const handleSearchPage = () => {
        router.push('http://127.0.0.1:5500/backtofront/demo/src/main/frontend/index.html'); // Redirect to the search page directly
    };

    const logout = () => {
        // Remove the token from local storage
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand className="me-auto">
                    MovieSite
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto d-flex align-items-center">
                        <Button variant="primary" onClick={handleSearchPage} className="me-3">
                            Search Movies
                        </Button>
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
                            {isLoggedIn && ( // Conditionally render logout based on state
                                <div>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
                                </div>
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                {!isLoggedIn && ( // Render Sign In button only if the user is not logged in
                    <Button variant="primary" onClick={signInButton}>Sign In</Button>
                )}
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
