const express = require('express')
const cors = require('cors')
require('dotenv').config();
const { connectDB } = require('./config/db')
const errorHandler = require('./errors/errorHandling')

const {userRouter} = require('./routes/userRoute');
const {productRouter} = require('./routes/productRoute');
const {orderRouter} = require('./routes/orderRoute');


const app = express();
app.use(express.json());
app.use(cors({
    origin: ['https://assignment-19-e-commerce-site-with-mern.vercel.app', 
            'https://mern-e-commerce-api-usf7.onrender.com', 
            'https://assignment-19-e-commerce-site-with-mern-o5xm0f7w6.vercel.app',         
            'https://assignment-19-e-commerce-site-with-mern-3rytafdqs.vercel.app' ], //'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']      // added to remove error while vercel deployment
}));


const port = process.env.PORT || 5005;
// Logging middleware
app.use((req, res, next) => {
    console.log(`Executed: ${req.method} ${req.url} Log Time: ${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()} `);
    next();
});

connectDB();    

// // Logging middleware
// app.use((req, res, next) => {
//     console.log(`Executed: ${req.method} ${req.url} Log Time: ${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()} `);
//     next();
// });


// Use the routers
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.use(errorHandler);
app.all('*', (req, res, next) => {  
    res.status(404).json({
        message: 'Page not found'
    });
});
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});