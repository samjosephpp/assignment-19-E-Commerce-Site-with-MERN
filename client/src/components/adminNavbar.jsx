import React , { useContext }from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';


const AdminNavBar = () => {
    const { logout } = useContext(AuthContext);

    // const logout = () => {
    //     console.log("Admin Logout")
    //     localStorage.removeItem('token');
    // }
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" >
            <Container   >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link as={Link} to="/">Login</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link> */}
                        <Nav.Link as={Link} to="/manageproducts">Manage Products</Nav.Link>
                        <Nav.Link as={Link} to="/allorders">All Orders</Nav.Link>
                        <Nav.Link as={Link} to="/login" onClick={logout} >Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    )

}

export default AdminNavBar;