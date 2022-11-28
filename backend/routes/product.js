const express = require('express');
const router = express.Router();

const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController')

router.get('/product', getProducts);
router.get('/product/:id', getSingleProduct);

router.post('/admin/product/new', newProduct);
router.put('/admin/product/:id', updateProduct);
router.delete('/admin/product/:id', deleteProduct);

module.exports = router;