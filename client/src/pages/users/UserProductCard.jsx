
import React from 'react';
import { Card, Button } from 'react-bootstrap';

function UserProductCard({ product, addToCart }) {
    return (
        <Card>
            <Card.Img variant="top" src={product.image} className='productImg' />
            <Card.Body className='productBody'>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>Category: {product.category}
                    <br />
                    <span>
                        {product.description}
                    </span>
                </Card.Text>
                <Button variant='primary' size="sm" style={ { margin: '5px'}}  onClick={() => addToCart(product)}> Add to cart</Button>               
            </Card.Body>
        </Card>

    )

}



export default UserProductCard