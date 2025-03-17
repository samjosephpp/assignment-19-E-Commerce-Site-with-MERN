import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from "./ProductCard";

const ProductList = (productsData) =>{
    const [products, setProducts] = useState(productsData["productsList"][0]);

    useEffect(() => {
        setProducts(productsData["productsList"][0]);
    }, [productsData]);
    
    return (
        <>
        </>
    )
}