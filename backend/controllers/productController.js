const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

//Create new product => /api/vi/product/new
exports.newProduct = catchAsyncErrors( async (req, res, next) => {
    
    const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });    
})

//Get all Products => /api/vi/product
exports.getProducts = catchAsyncErrors( async (req, res, next) => {

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter();

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        products,
        count: products.length
    });
})

//Get single product details => api/vi/product/:id
exports.getSingleProduct = catchAsyncErrors( async (req, res, next) => {
    
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

// Update Product => api/vi/product/:id
exports.updateProduct = catchAsyncErrors( async(req,res, next) => {
    
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found to update', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    });
})

//Delete product = api/vi/product/:id
exports.deleteProduct = catchAsyncErrors( async (req, res, next) => {
    
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found to delete', 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        messsage: 'Product is deleted'
    });
})
