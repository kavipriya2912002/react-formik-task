import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function Topbar() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar expand="md" className="bg-success">
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate('/')}><b>Library Management System</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={() => navigate('/')}><b>Book Dashboard</b></Nav.Link>
                            <Nav.Link onClick={() => navigate('/dashboard-author')}><b>Authors Dashboard</b></Nav.Link>                        
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Topbar;