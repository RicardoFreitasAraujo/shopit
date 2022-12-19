const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { getProducts, 
        newProduct, 
        getSingleProduct, 
        updateProduct, 
        deleteProduct,
        createProductReview,
        getProductReviews,
        deleteProductReview } = require('../controllers/productController')

router.get('/product', getProducts);
router.get('/product/:id', getSingleProduct);

//Protected Routes
router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

//Product
router.put('/review', isAuthenticatedUser, createProductReview );
router.get('/review', isAuthenticatedUser, getProductReviews );
router.delete('/review', isAuthenticatedUser, deleteProductReview);


module.exports = router;