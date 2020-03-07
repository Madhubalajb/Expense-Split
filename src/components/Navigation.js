import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import UserService from './UserService'
import Home from '../components/Home'

const Navigation = () => {
    return (
        <Router>
            <Navbar collapseOnSelect expand="sm" className="fixed-top">
                <Navbar.Brand>
                    <Link to="/"><b>Expense <span className="slash">/</span> Split</b></Link>
                </Navbar.Brand>

                <Switch>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>

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