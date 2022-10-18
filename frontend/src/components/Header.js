import React from 'react'
import {Container, Image, Nav, Navbar} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap";
import SearchBox from "./SearchBox"

function Header() {

    return (
        <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand><Image
                        src="../logo.png"
                        width="180"
                        height="100"
                        className="d-inline-block align-top"
                        alt=""
                    /></Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <LinkContainer to='post/fashion/'>
                            <Nav.Link>FASHION</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='post/beauty/'>
                            <Nav.Link>BEAUTY</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='post/life/'>
                            <Nav.Link>LIFESTYLE</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='post/people/'>
                            <Nav.Link>PEOPLE</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
                <SearchBox/>
            </Container>
        </Navbar>
    )

}

export default Header