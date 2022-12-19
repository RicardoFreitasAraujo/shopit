const express = require('express');
const router = express.Router();

const { newOrder, 
        getSingleOrder, 
        myOrder, 
        allOrder, 
        updateOrder,
        deleteOrder }  = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);
router.get('/orders/me', isAuthenticatedUser, myOrder);

//Admin Order
router.get('/admin/orders/', isAuthenticatedUser, authorizeRoles('admin'), allOrder);
router.put('/admin/order/:id', isAuthenticatedUser, authorizeRoles('admin'), updateOrder);
router.delete('/admin/order/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

module.exports = router;