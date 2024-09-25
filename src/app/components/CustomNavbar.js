'use client';
import { useRouter } from "next/navigation";
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const CustomNavbar = () => {
    const router = useRouter(); // Initialize useRouter

    const signInButton = () => {
        router.push("/sign-in");
    };

    const handleSearchPage = () => {
        router.push('http://127.0.0.1:5500/backtofront/demo/src/main/frontend/index.html'); // Redirect to the search page directly
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
