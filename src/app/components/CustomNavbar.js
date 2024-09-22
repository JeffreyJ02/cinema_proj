'use client'
import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, NavDropdown, Button} from 'react-bootstrap';
import { useRouter } from "next/navigation";

const CustomNavbar = () => {
    const router = useRouter();
    const signInButton = () => {
        router.push("/sign-in");
    }
    {/* Navbar component from bootstrap library*/}
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            {/* Logo for navbar */}
            <Navbar.Brand className="me-auto">
            {/* <img src="./x_pic.svg" alt="Logo" style={{ width: '50px' }}/> */}
            MovieSite
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto d-flex align-items-center">
                <Form className="d-flex me-3">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                </Form>
                {/* Dropdown menu */}
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
                    <NavDropdown.Item href="#action/1">Edit Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action/2">Manage Account</NavDropdown.Item>
                    <NavDropdown.Item href="#action/2">View Order History</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3">Sign Out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
            {/* Sign In Button */}
            <Button variant="primary" onClick={signInButton}>Sign In</Button>
        </Container>
        </Navbar>
    );
};

export default CustomNavbar;
