import React from "react";
import '../assets/NavbarStyle.css';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet, useLocation, useNavigate, Link, Navigate } from "react-router-dom";
import { getToken, removeToken } from "../Services/UserService";
import { toast } from 'react-toastify';

export function Navigationbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    removeToken();
    toast.success('Logged out successfully!');
    navigate('/login', { replace: true });
  };

  return (
    <Navbar className="custom-navbar" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Bookly</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/book" className={location.pathname === "/book" ? "active" : ""}>
              Reviews
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={location.pathname === "/about" ? "active" : ""}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
              Contact
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="nav-link">
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export function RenderNavBar() {
  const location = useLocation();
  const token = getToken();

  // Don't show navbar on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <div>
      <Navigationbar />
    </div>
  );
}

export function PrivateRoute() {
  const token = getToken();
  return token ? <Outlet /> : <Navigate to="/login" />;
}