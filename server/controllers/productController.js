const express = require("express");
const { Products } = require('../models/productModel');
 


// to get all products
const getProducts = async (req, res, next) => {
 
    const { page = 1, limit = 10 } = req.query; // Default values: page 1, limit 10
    // find the starting and ending indices
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // Slice the products array to get the paginated data

    try {

        const products = await Products.find().limit(limit).skip(startIndex);
        res.status(200).json({
            data: products,
            page: parseInt(page),
            limit: parseInt(limit),
            totalProducts: products.length,
            totalPages: Math.ceil(products.length / limit),
            message: "Product data retrieved"
        });

    } catch (error) {
        res.status(400).json(error);
    }

}


// to get all products
const getShopProducts = async (req, res, next) => {

    console.log("inside getShopProducts");

    const { page = 1, limit = 10 } = req.query; // Default values: page 1, limit 10
    // find the starting and ending indices
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // Slice the products array to get the paginated data
    try {

        // const products = await Products.find().limit(limit).skip(startIndex);
        const products = await Products.find().limit(limit).skip(startIndex)
       return res.status(200).json({
            data: products,
            page: parseInt(page),
            limit: parseInt(limit),
            totalProducts: products.length,
            totalPages: Math.ceil(products.length / limit),
            message: "Product data retrieved"
        });

    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }

}


// to get single product
const getProductById = (req, res, next) => {
    const _id = req.params.id;
    const product = Products.find(product => product._id === _id);
    if (!product) {
        return res.status(404).json({ message: `Product with id ${_id} not found` });
    }
    res.status(200).json(product);

}

// to create new product
const createProduct = async (req, res, next) => {
    const { name, price, stockQty, description, category, image } = req.body;
   
    if (!name || !price || !description || !category) {
        return res.status(400).json({ message: "Please provide name, price , category and description" });
    }
    // if (Products.findOne(product => product.name === name)) {
    //     return res.status(400).json({ message: `Product with name ${name} already exists` });
    // }
    try {

        const existingProduct = await Products.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ message: `Product with name ${name} already exists` });
        }
        

        // // Find the maximum id in the product collection
        const maxProductId = await Products.findOne().sort('-id').exec();
        // const maxId = maxProductId ? maxProductId.id : 0;
        // maxId = maxId++;

        let maxId = maxProductId ? maxProductId.id : 0;
        maxId++;


        const product = new Products({ id: maxId, name, price, stockQty, description, category, image });
        await product.save();

        return res.status(200).send({
            message: "Product created successfully",
            success: true,
            data: product
        });

    } catch (error) {
        next(error);
    }
}

// to update existing product
const updateProduct = async (req, res, next) => {
    const _id = req.params.id;
    const { name, price, stockQty, description, category, image } = req.body;
    if (!name || !price || !description || !category) {
        return res.status(400).json({ message: "Please provide name, price , category and description" });
    }

    try {

        const product = await Products.findOneAndUpdate({ _id: _id }, 
                { name, price, stockQty, description, category, image },
                { new: true })
        if (!product) {
            return res.status(404).json({ message: `Product with id ${_id} not found` });
        }
        // await product.save();
        res.status(201).json({
            message: "Product Succesfully updated",
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
 
}


// to delete existing product
const deleteProduct =  async (req, res, next) => {
    try {        
        const _id = req.params.id;
        const deletedProduct = await Products.findByIdAndDelete(_id);      
        console.log(deletedProduct);
        if (!deletedProduct) {
            return res.status(404).json({ message: `Product with id ${_id} not found` });
        }
        // await deleteProduct.save();
        res.status(200).json({
            message: "Product Succesfully deleted",
            success: true,
            data: deletedProduct
        });
 
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getProducts,
    getShopProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}