'use client'
import Link from 'next/link';
import { Container, Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import "@/styles/container.css";

function AppHeader() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary header">
        <Container  >
          <Navbar.Brand><Link href={"/"} className='navbar-brand'>Group 14 - NextJS</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Link href={"/todolist"} className='nav-link'>To-do List</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <p className="text-center mt-4 mb-4">NextJS</p> */}
    </>
  );
}

export default AppHeader;