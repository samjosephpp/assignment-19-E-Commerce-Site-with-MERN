const express = require('express');
const router = express.Router();


const { createProduct, updateProduct, deleteProduct, getProductById, getProducts, getShopProducts   } = require ('../controllers/productController')
const { authenticateToken } = require('../middleware/authUser')

router.get('/',getProducts);
router.get('/shopitems', getShopProducts );
router.post('/', authenticateToken , createProduct); 
router.put('/:id', authenticateToken , updateProduct);
router.delete('/:id', authenticateToken , deleteProduct);
router.get('/:id', getProductById);


module.exports = {productRouter : router}