import React from 'react'
import { H3 } from '@leafygreen-ui/typography';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';

const NavbarMDB = () => {
  return (
    <Navbar expand="lg" className="NavbarMDB bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
            <H3>MongoDB Demo</H3>
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar> )
}

export default NavbarMDB