const Product = require('../models/productModel');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/product.json');

// Setting dotenv file
dotenv.config({ path: './config/config.env'});

connectDatabase();

const seedProducts = async () => {
    try {

        await Product.deleteMany();

        console.log(`Product ara deleted`);

        await Product.insertMany(products);
        console.log('All Products as added');

        process.exit();

    }
    catch(error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();