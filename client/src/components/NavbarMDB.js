import React from 'react'
import { H3 } from '@leafygreen-ui/typography';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';

const NavbarMDB = () => {
  return (
    <Navbar expand="lg" className="NavbarMDB bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
            <H3>MongoDB Demo</H3>
        </Navbar.Brand>
      </Container>
    </Navbar> )
}

export default NavbarMDB
