import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card, Alert, Accordion, Button, Badge  } from 'react-bootstrap'
import { getOrders } from '../../services/dataServices'

const ManageOrders = () => {

      const [orders, setOrders] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        let index = 1;

         useEffect(() => {
                const fetchData = async () => {
                    try {
                        const result = await getOrders(); 
        
                        if (result.success) {
                            setOrders(result.data.data);
                        } else {
                            setError(result.message);
                        }
                        setLoading(false);
        
                    } catch (error) {
                        setError("Error while fetching shopitems. " + error);
                    }
                };
        
                fetchData();
        
            }, [])
            if (loading) {
                return (<h2> <Spinner animation="border" variant="primary" /></h2>)
            }
    return(
        <>
            <Container>
                <h1>All Orders</h1>
                {error && <span className='text-center text-danger mt-1'>{error}</span>}

                <Row>
                    {orders.length > 0 ? (
                        <Accordion>
                            {
                                orders.map(order => (
                                    <Accordion.Item eventKey={order._id} key={order._id}>
                                        <Accordion.Header>Order Number :  <Button variant="outline-primary"> {order.orderNumber} </Button>   Ordered on : { order.createdAt }    Ordered By <Button variant="outline-info">{order.userName}</Button>  
                                            {/* Order at : {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Unknown Date'} 
                                            Ordered By : {order.userName ? order.userName : 'Unknown User'}  {order.userId }  */}
                                            </Accordion.Header>
                                        <Accordion.Body>
                                            {
                                                <Row>
                                                    {
                                                        order.products.length > 0 ? (
                                                            order.products.map(product => (
                                                                <Col md={4} key={`${order._id}-${product._id}-${index++}`}>
                                                                    <Card style={{ width: '18rem' }}  >
                                                                        <Card.Body>
                                                                            <Card.Title>{product.name}</Card.Title>
                                                                            <Card.Subtitle className="mb-2 text-muted"> {product.category}</Card.Subtitle>
                                                                            <Card.Text>
                                                                                {product.description}
                                                                            </Card.Text>
                                                                            <Card.Text>
                                                                                <Button variant="info">
                                                                                    Price <Badge bg="primary">{product.price}</Badge>
                                                                                </Button>
                                                                            </Card.Text>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </Col>

                                                            ))
                                                        ) : (<span>No products found in this order.</span>)
                                                    }
                                                </Row>



                                            }
                                        </Accordion.Body>
                                    </Accordion.Item>

                                ))
                            }

                        </Accordion>

                    ) : (
                        // <p>No products found.</p>
                        <span></span>
                    )}

                </Row>
                {orders.length === 0 && <Alert variant="danger">No orders found.</Alert>}
            </Container>
        </>
    )
    
};

export default ManageOrders;