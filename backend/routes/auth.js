const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const { registerUser, loginUser, logout, 
        forgotPassword, resetPassword,
        getUserProfile, changePassword,
        updateProfile, allUsers,
        getUserDetails, updateUser,
        deleteUser } = require('../controllers/authContoller')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logout);

//Password Module
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
router.post('/password/update', isAuthenticatedUser, changePassword);

//Me Module
router.get('/me', isAuthenticatedUser, getUserProfile);
router.put('/me/update', isAuthenticatedUser, updateProfile);

//Admin Module
router.get('/admin/users', isAuthenticatedUser, authorizeRoles('admin'), allUsers);
router.get('/admin/users/:id', isAuthenticatedUser, authorizeRoles('admin'), getUserDetails);
router.put('/admin/users/:id', isAuthenticatedUser, authorizeRoles('admin'), updateUser);
router.delete('/admin/users/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteUser);


module.exports = router;