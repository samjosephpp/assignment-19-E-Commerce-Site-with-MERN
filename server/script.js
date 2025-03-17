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
    origin: 'https://assignment-19-e-commerce-site-with-mern.vercel.app', //'http://localhost:5173',
    credentials: true
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