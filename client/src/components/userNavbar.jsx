import React, {useContext} from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';


const UserNavBar = () => {
    const { logout } = useContext(AuthContext);
    // const logout = () => {
    //     console.log("User Logout")
    //     localStorage.removeItem('token');

    // }
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" >
            <Container   >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}                       
                        {/* <Nav.Link as={Link} to="/">Home2</Nav.Link>
                        <Nav.Link as={Link} to="/pages/users/shopping">Products</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/users/register">Register</Nav.Link>
                        <Nav.Link as={Link} to="/pages/users/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/pages/users/myCart">My Cart</Nav.Link>
                        <Nav.Link as={Link} to="/pages/users/myorders">My Orders</Nav.Link>
                        <Nav.Link as={Link} to="/" onClick={logout} >Logout</Nav.Link>
                        <Nav.Link as={Link} to="/admin/Login">Admin Login</Nav.Link> */}
                           {/* <Nav.Link as={Link} to="/pages/users/dashboard">Dashboard</Nav.Link> */}
                        <Nav.Link as={Link} to="/myCart">My Cart</Nav.Link>
                        <Nav.Link as={Link} to="/myorders">My Orders</Nav.Link>
                        <Nav.Link as={Link} to="/login" onClick={logout} >Logout</Nav.Link>
              
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
        
    )

}

export default UserNavBar;