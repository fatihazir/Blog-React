import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Dropdown, ButtonGroup, Button } from "react-bootstrap";


let dataOfAdmin = sessionStorage.getItem('Admin')
let Admin = JSON.parse(dataOfAdmin)

export class NavigationBar extends Component {

    Rst= () => {
        sessionStorage.setItem('Admin', null)
        alert("Session End.")
    }

    render() {
        if(Admin){
            return (
                <div>
                    <Navbar bg="dark" expand = "lg"  fixed="top">
                        <Navbar.Toggle aria-controls = "basic-navbar-nav"/>
                        <Navbar.Collapse id = "basic-navbar-nav">

                            <Nav>
                                <NavLink className = "d-inline p-2 bg-dark text-white" to="/">HomePage</NavLink>
                                <NavLink className = "d-inline p-2 bg-dark text-white" to="/Categories">Categories</NavLink>


                                <NavLink className = "d-inline p-2 bg-dark text-white" to="/AdminPanel" >Admin Panel</NavLink>
                                <a href="/"><Button onClick={this.Rst} variant="danger">Log out <i className="fas fa-unlock"></i></Button></a>
                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>

                </div>
            );
        }
        else{
            return (
                <div>
                    <Navbar bg="dark" expand = "lg"  fixed="top">
                        <Navbar.Toggle aria-controls = "basic-navbar-nav"/>
                        <Navbar.Collapse id = "basic-navbar-nav">

                            <Nav>
                                <NavLink className = "d-inline p-2 bg-dark text-white" to="/">HomePage</NavLink>
                                <NavLink className = "d-inline p-2 bg-dark text-white" to="/Categories">Categories</NavLink>
                                <Nav className = "d-inline p-2 bg-dark text-white " style={{marginTop:'-0.4rem'}}> <Dropdown as={ButtonGroup}>

                                    <Button variant="secondary" style={{marginLeft:'1rem'}}>Login</Button>

                                    <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/Login">Admin <i className="fas fa-user-shield"></i></Dropdown.Item>
                                        <Dropdown.Item href="/Login">Login for members. Not activated</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </Nav>

                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>

                </div>
            );
        }
    }
}
