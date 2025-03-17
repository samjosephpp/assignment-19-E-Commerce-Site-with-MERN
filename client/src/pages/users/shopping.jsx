import React, { useContext, useEffect, useState } from "react";
import { createOrder, getShoppingitems } from "../../services/dataServices";
import { Container, Row, Col, Spinner, Card, Alert } from 'react-bootstrap'
import UserProductCard from "./UserProductCard";
 
import { AuthContext } from '../../context/AuthContext';

import Cart from "./Cart";
import { getLoggedInRole, getLoggedInUserDetail } from "../../services/utilService";

const API_URL = import.meta.env.VITE_API_URL;

const Shopping = () => {

    const [shopItems, setShopItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [cart, setCart] = useState([]);
    const { loggedUser } = useContext(AuthContext);
    

    const addToCart = (product) => {
        setCart([...cart, product]);
    }
    const deleteFromCart = (product, index) => {

        const newcart = [...cart]
        newcart.splice(index, 1);
        setCart(newcart)
        // const newCart = cart.filter(item => item.id !== product.id);
        // setCart(newCart);
    }
    const SaveOrder = async () =>{
       
        // let userId = getLoggedInUserDetail('').id;
        // console.log(userId);
        // if(!userId) {
        //     alert("Log in to save to order")
        //     return ;
        // }
        let userId = ''
        const orderData = {
            //  userId:userId,
            products: cart
        };
        // cart.map( c => { 
        //     console.log(c);
        // })
        const response = await createOrder({products: cart});
        if (response.success) {
            alert("Order saved successfully!");
            setCart([]); // Clear the cart after saving the order
        } else {
            alert(response.message);
        }
    }
   

    useEffect(() => {

        const fetchData = async () => {

            try {
                // const res_shopitems = await axios.get(`${API_URL}/api/products/shopitems`);
                const res_shopitems = await getShoppingitems();
                // console.log('----------res_shopitems-----------')
                //  console.log(res_shopitems.data)


                if (res_shopitems.success) {
                    setShopItems(res_shopitems.data.data);
                } else {
                    setError(res_shopitems.message);
                }
                setLoading(false);
                // console.log(shopItems.length)

            } catch (error) {
                setError("Error while fetching shopitems. " + error);
            }
        };
        fetchData();
    }, [])
    if (loading) {
        return (<h2> <Spinner animation="border" variant="primary" /></h2>)
    }
    // else { console.log(customers.length) }
    if (error) {
        return <p>Error: {error}</p>;
    }

    if (shopItems.length === 0) {
        return (
            <Container>
                <Alert variant="danger">No products found.</Alert>
            </Container>
        );
    }
    return (
        <>
            <h4>Loaded {shopItems.length} products</h4>
            <Container>
                <Row>
                <Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={8} >
                        <Row>
                            {shopItems.length > 0 ? (
                                shopItems.map(product => (
                                    <Col key={product.id} xs={12} sm={6} md={4} lg={4} xl={4} xxl={4}>
                                        <UserProductCard key={product.id} product={product} addToCart={addToCart} />
                                    </Col>
                                ))
                            ) : (
                                <span></span>
                            )}
                        </Row>
                    </Col>
                    <Col xs={12} sm={4} md={4} lg={4} xl={4} xxl={4}>
                        <Cart cart={cart} deleteFromCart={deleteFromCart} SaveOrder={SaveOrder} />
                    </Col>
                </Row>

            </Container>

            {/* <Row>
                {shopItems.length > 0 ? (
                    shopItems.map(product => (
                        <Col key={product.id} xs={12} sm={6} md={4} lg={4} xl={3} xxl={3} >

                            <UserProductCard key={product.id} product={product} addToCart={addToCart}> </UserProductCard>
                        </Col>
                    ))
                ) : (
                    // <p>No products found.</p>
                    <span></span>
                )}
            </Row> */}
        </>
    )
};

export default Shopping;