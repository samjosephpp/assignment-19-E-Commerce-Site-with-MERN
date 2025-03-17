import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Card, Alert, Form } from 'react-bootstrap'
import { addNewProduct, getProducts, removeProduct, updateProduct } from '../../services/dataServices'
import AdminProductCard from './AdminProductCard'
import axiosInstance from "../../services/axiosService";


const ManageProducts = () => {

    const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0,
        stockQty: 0,      
        description: '',
        category : '',
        image: ''
        
    });
    const [isEditing, setIsEditing] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null);

    useEffect(
        () => {

            const fetchData = async () => {
                try {
                    const result = await getProducts();
                    if (result.success) {
                        setproducts(result.data.data);
                    } else {
                        setError(result.message);
                    }
                    setLoading(false);
                    console.log(products.length)

                } catch (error) {
                    setError("Error while fetching products. " + error);
                }
            };
            fetchData();

        }, [])
    if (loading) {
        return (<h2> <Spinner animation="border" variant="primary" /></h2>)
    }

    // if (error) {
    //     return <p>Error: {error}</p>;
    // }

    // if (products.length === 0) {
    //     return (
    //         <Container>
    //             <Alert variant="danger">No products founds.</Alert>
    //         </Container>
    //     );
    // }

    const addProduct = async () => {
        try {
            // console.log(`Add product `);
            const result = await addNewProduct(newProduct);
            if (result.success) {
                // setproducts(result.data.data);
                setproducts([...products, newProduct])
                alert("New product created successfully")
                clearForm()
            } else {
                setError(result.message);
            }

        } catch (error) {
            setError(error?.response?.data?.message || 'Error deleting product.');
        }
    }

    const editProduct = (product) => {
        try {
            // console.log(`Edit product ${product}`);
            setIsEditing(true);
            setProductToUpdate(product);
            setNewProduct({   
                _id: product._id || '',             
                name: product.name || '',
                price: product.price || 0,
                stockQty: product.stockQty || 0,
                description: product.description || '',
                category: product.category || '',
                image: product.image || ''
            });

        } catch (error) {
            setError(error?.response?.data?.message || 'Error deleting product.');
        }
    }

    const updateProductHandler = async() => {
        // console.log(newProduct)
        // console.log(`Update product `);
        const result = await  updateProduct (newProduct);
        if (result.success) {           
            const updatedProducts = products.map( (product)=> (product._id === productToUpdate._id ) ?  result.data.data : product ) ;
            setproducts(updatedProducts)
            alert("Product Updated successfully")
            clearForm()
        } else {
            setError(result.message);
        }

    }

    const deleteProduct = async (product) => {
        try {
            // console.log(`Delete product ${product}`);
            // console.log(`Delete product ${product._id}`);
            const result = await removeProduct(product._id);
            if (result.success) {
                const updatedProducts = products.filter((p) => p._id !== product._id);
                setproducts(updatedProducts);
                alert("Product deleted successfully");
            } else {
                setError(result.message);
            }

        } catch (error) {
            setError(error?.response?.data?.message || 'Error deleting product.');
        }
    }
    const resetButton = () => {
        clearForm()
    }

   const  clearForm = () => {
    setIsEditing(false);
    setProductToUpdate(null);
    setNewProduct({ 
        name: '',
        price: 0,
        stockQty: 0,      
        description: '',
        category : '',
        image: ''
    });
    setError('');
    }

    return (
        <>
            <Container>
                <h1>Manage products</h1>
                {error && <span className='text-center text-danger mt-1'>{error}</span>}
               
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Product Name"   value={newProduct.name}
                              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPrice">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control type="Number" placeholder="Price"   value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridStockQty">
                        <Form.Label>Product Qty</Form.Label>
                        <Form.Control type="Number" placeholder="Stock Qty"   value={newProduct.stockQty}
                                onChange={(e) => setNewProduct({ ...newProduct, stockQty: e.target.value })} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDesc">
                        <Form.Label>Product description</Form.Label>
                        <Form.Control type="text" placeholder="Product description"   value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCateg">
                        <Form.Label>Product Category</Form.Label>
                        <Form.Control type="text" placeholder="Product Category"   value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCateg">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control type="text" placeholder="Product Image"   value={newProduct.image}
                                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
                    </Form.Group>
                 
                    <div>
                    <button type="button" className="btn btn-primary btn-block" style={ { margin: '10px'}} onClick={isEditing ? updateProductHandler : addProduct} disabled={loading}>{isEditing ? 'Update' : 'Add'}</button>
                    <button type="button" className="btn btn-secondary btn-block" disabled={loading} onClick={resetButton}>Reset</button>
                    </div>
                     

                </Row>
                <Row>
                    {products.length > 0 ? (
                        products.map(product => (
                            <Col key={product.id} xs={12} sm={6} md={4} lg={4} xl={3} xxl={3} >                                
                                <AdminProductCard key={product.id} product={product} editProduct={editProduct} deleteProduct={deleteProduct} ></AdminProductCard>
                            </Col>
                        ))
                    ) : (
                        // <p>No products found.</p>
                        <span></span>
                    )}

                </Row>
                {products.length === 0 &&  <Alert variant="danger">No products found.</Alert>  }
            </Container>

        </>
    )

};

export default ManageProducts;