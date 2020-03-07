import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import UserService from './UserService'

const Navigation = () => {
    return (
        <Router>
            <Navbar collapseOnSelect expand="sm" className="fixed-top">
                <Navbar.Brand href="/">
                    <b>Expense <span className="slash">/</span> Split</b>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <UserService />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Router>
    )
}

export default Navigation