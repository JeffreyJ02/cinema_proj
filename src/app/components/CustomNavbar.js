"use client";
import { useRouter } from "next/navigation";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment, IconButton } from "@mui/material";

const CustomNavbar = () => {
  const router = useRouter();
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
  const signInButton = () => {
    router.push("/sign-in");
  };
  const handleSearchPage = () => {
    router.push(`/search/${document.querySelector("input").value}`);
  };

  const logout = async () => {
    console.log("Document cookie:", document.cookie);
    document.cookie = "token=; Max-Age=0; path=/;";
    localStorage.removeItem("userEmail");
    try {
      const response = await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchAdminStatus = async (email) => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    try {
      const response = await fetch(
        `http://localhost:8080/api/get-user-admin-status?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use token-based authentication
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch admin status");
      }

      const data = await response.json();
      setIsAdmin(data.admin === 1); // Set admin status based on response
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      fetchAdminStatus(userEmail); // Fetch admin status if user is logged in
    }
  }, []);


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src="/movieicon.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          ShowTime
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto d-flex align-items-center">
            <TextField
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearchPage}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <NavDropdown
              title={
                <img
                  src="/menu.svg"
                  alt="Dropdown Icon"
                  style={{ width: "20px", height: "20px" }}
                />
              }
              id="basic-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item>{`Hello, ${
                localStorage.getItem("userEmail") || "Guest"
              }`}</NavDropdown.Item>
              <NavDropdown.Item href="/edit-profile">
                Edit Profile
              </NavDropdown.Item>
              {isAdmin && ( // Conditionally render admin option
                <NavDropdown.Item href="/admin">Admin Page</NavDropdown.Item>
              )}
              {localStorage.getItem("userEmail") && ( // Conditionally render logout based on state
                <div>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
                </div>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {!localStorage.getItem("userEmail") && (
          <Button variant="primary" onClick={signInButton}>
            Sign In
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
