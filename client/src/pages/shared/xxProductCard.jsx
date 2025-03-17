import { Link } from 'react-router-dom';

import { Card, Button } from 'react-bootstrap';

const ProductCard = (productDetails) => {

    const product = productDetails["product"][0];

    return (
        <>
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
                    {/* <Button variant='primary' onClick={() => addToCart(product)}> Add to card</Button> */}
                    {
                        (productDetails["product"][1] === "products") &&
                        <Button variant="outline-primary"   onClick={handleAddtoCart}>Add to Cart</Button>
                    }

                    {
                        (productDetails["product"][1] === "admin") &&
                        <div>
                            <Button variant="outline-primary" className="m-3 text-light" style={{ color: "white" }} onClick={handleEdit}>Edit Product</Button>
                            <Button variant="outline-danger" className="text-light" onClick={handleDelete}>Delete Product</Button>
                        </div>
                    }
                </Card.Body>
            </Card>

        </>
    )
}