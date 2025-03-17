import { Button } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';

const Cart = ({ cart, deleteFromCart , SaveOrder}) => {
    const totalPrice = cart.reduce((total, product) => total + product.price, 0);
     return (
        <div className="cart">
            <h2>Cart</h2>
            {cart.length > 0 ? (
                <ul className="cart-list">
                    {cart.map((product, index) => (
                        <li key={index}>
                            {/* <Stack direction="horizontal" gap={3}>
                            <div className="p-2">{product.name}</div>
                            <div className="p-2 ms-auto">${product.price}</div>
                            <div className="p-2"><Button variant="danger" size="sm" onClick={() => deleteFromCart(product) } >-</Button></div>
                            </Stack> */}
                            {product.name} - ${product.price}
                            <Button variant="danger" size="sm" onClick={() => deleteFromCart(product, index)} >-</Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items in cart</p>
            )}
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            {
                cart.length > 0 ? ( 
                    <Button variant="primary" size="sm" onClick={SaveOrder} >Save Order</Button>                
                ): (<></>)
            }
              </div>
    )
}

export default Cart;