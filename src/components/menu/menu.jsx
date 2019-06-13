import React, { Component } from "react";
import { Navbar, NavDropdown, Nav, Brand } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./menu.css";



import { connect } from "react-redux";
import { withRouter } from "react-router";

class MenuBar extends Component {
    logout = async (evt) => {
        evt.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("mobilenumber");
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
            });
        }


    }
    state = {};
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <Navbar
                        collapseOnSelect
                        expand="lg"
                        className="navigation" >
                        <Navbar.Brand href="#">FunGames</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                            <Link to="/userdashboard">home</Link>
                            {/* <Link to="/mobsearch">start new business</Link> */}
                            <Link onClick={this.logout}>Logout</Link>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
        );
    }
}


export default withRouter(
    connect()(MenuBar)
);