const express = require("express");
const Orders = require('../models/orderModel');
const users = require('../models/userModel'); 

const getOrders = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query; // Default values: page 1, limit 10
    // find the starting and ending indices
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // Slice the products array to get the paginated data
    try {
        // const orders = Orders.find().limit(limit).skip(startIndex);

        const orders = await Orders.find().limit(limit).skip(startIndex).populate('userId', 'name');                         
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: `Orders for user ${userId} not found` });
        }

        // Rename the user's name field to userName
        const ordersWithUserName = orders.map(order => {
            const orderObj = order.toObject();
            orderObj.userName = orderObj.userId.name;
            delete orderObj.userId.name;
            return orderObj;
        });

        res.status(200).json({
            data: ordersWithUserName,
            page: parseInt(page),
            limit: parseInt(limit),
            totalProducts: orders.length,
            totalPages: Math.ceil(orders.length / limit),
            message: "Orders retrieved"
        });
    } catch (error) {
        next(error)
    }
}

// const getOrderById = async (req, res, next) => {
//     // const _id = req.params.id;
//     // // const order = Orders.findById(_id);
//     // // if(!order) {
//     // //     return res.status(404).json({ message: `Order not found` });
//     // // }
//     // // res.status(200).json(order);
//     // res.status(200).json( );


//     const _id = req.params.id;
//     try {
//         const order = await Orders.findById(_id);
//         if (!order) {
//             return res.status(404).json({ message: `Order not found` });
//         }
//         const safeOrder = CircularJSON.stringify(order);
//         res.status(200).json(JSON.parse(safeOrder));
//     } catch (error) {
//         next(error);
//     }

// }

const getOrderByUserId =  async (req, res, next) => { 
    const userId = req.params.userId;
    // const order = Orders.find( order => order.userId === userId);
    // if(!order) {
    //     return res.status(404).json({ message: `Orders for user ${userId} not found` });
    // }

    const orders = await Orders.find({ userId: userId });
    if (!orders || orders.length === 0) {
        return res.status(404).json({ message: `Orders for user ${userId} not found` });
    }
    res.status(200).json(orders);
}

const getMyOrders =  async (req, res, next) => { 
    const userId = req.user;
    try {
        console.log(`userId ${userId}`)
        const orders = await Orders.find({ userId: userId });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: `Orders for user ${userId} not found` });
        }
        // console.log('Orders for logged user:', orders); // Add this line to log the orders
       
        // JSON.stringify(responseData); // This will throw an error if there are circular references

        // res.status(200).json(userId);
        res.status(200).json( {
            success: true, data: orders , message: 'Orders successfully received!'
        })
    } catch (error) {
        console.error('Error fetching orders for logged user:', error); // Add this line to log the error
        next(error);
    }
}



const createOrder = async(req, res, next) =>{

    console.log('Inside createOrder')
    try {
       
        const { products } = req.body ;
        const userId = req.user        
        // const _userId = req.user.id; // Extract userId from req.user
 
        // console.log( `products : ${products}`)
        if(!userId || !Array.isArray(products) || products.length <=0 ) {
            return res.status(404).json({ message: `Invalid Orders` });
        }

        var orderNumber = generateOrderNumber();
        // Create a new order
        const newOrder = new Orders({
            // id,
            orderNumber: orderNumber,
            userId,
            products: []
        }); 
        // // Save each product individually
        for (const product of products) {
            newOrder.products.push(product);           
        }
 
        // Save the new order to the database
        const savedOrder = await newOrder.save();
        res.status(201).json({data:savedOrder, message: "Order Successfully saved", success: true});
    } catch (error) {
        console.error('Error creating new order:', error);
        next(error)
    }
   
}

const  generateOrderNumber = () => {
    var orderNumber = '';
    try {
        const timestamp =  Date.now();
        const ts  = Date.now().timestamps;
        // console.log(ts);
        // const randomString = uuidv4();   npm install uuid //// Not used
        orderNumber = `ORD-${timestamp}`
        
    } catch (error) {
        orderNumber = ''
    }    
    // console.log(`generateOrderNumber : ${orderNumber}`)
    return orderNumber;
}


module.exports = { 
        getOrders
        // , getOrderById
        , getOrderByUserId 
        , createOrder
        , getMyOrders
    }