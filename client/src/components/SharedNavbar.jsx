import React, {   useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import UserNavBar from './userNavbar'
import AdminNavBar from "./adminNavbar";
import { getLoggedInRole } from '../services/utilService'
import { AuthContext } from '../context/AuthContext';

const SharedNavbar = () => {

    const { isLoggedIn, userRole } = useContext(AuthContext);
    // console.log(userRole)

    // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    // const [userRole, setUserRole] = useState(null);


    // // const [isLoggedIn, setIsLoggedIn] = useState(true);

    // useEffect(() => {
    //     // Replace this with your actual authentication check
    //     const checkUserLoggedIn = () => {
    //         const token = localStorage.getItem('token');
    //         console.log(`token : ${token}`)
    //         if (token) {
    //             setIsLoggedIn(true);
    //             // Fetch user role from localStorage or an API
    //             // const role = localStorage.getItem('role'); // Replace with your actual logic
    //             const role = getLoggedInRole(token);
    //             console.log(`role from token : ${role}`)
    //             setUserRole(role);
    //         } else {
    //             setIsLoggedIn(false);
    //             setUserRole(null);
    //         }
    //     };

    //     checkUserLoggedIn();
    // }, []);

    return (
        <>

            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" >
                <Container   >
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/products">Products</Nav.Link> {/* Corrected path */}
                            {/* <Nav.Link as={Link} to="/login">Login</Nav.Link> */}
                            {!isLoggedIn && (
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            )}

                        </Nav>
                        {isLoggedIn && (userRole === 'client' || userRole === 'site') && (
                            <Nav className="ml-auto">
                                <UserNavBar />
                            </Nav>
                        )}
                        {isLoggedIn && userRole === 'admin' && (
                            <Nav className="ml-auto">
                                <AdminNavBar />
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>

            </Navbar>

        </>
 
    )
}

export default SharedNavbar;