const mongoose = require('mongoose')
// const products = require('./productModel')
const { productSchema } = require('./productModel'); // Import productSchema


const ordersSchema = new mongoose.Schema({

    id: { type: Number, required: true , default: 0},
    orderNumber: { type: String, required : true   },
    // userId: { type: String, required: true },
    // products: { type: [productSchema], required: true }
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    // products: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Product'
    //     }
    // ],
    products: { type: [productSchema], required: true }
},  { timestamps: true} );

// // Pre-save hook to generate unique orderNumber
// ordersSchema.pre('save', function(next) {
//     if(!this.orderNumber){
//         const timestamp =  Date.now();
//         const ts  = Date.now().timestamps;
//         console.log(ts);
//         // const randomString = uuidv4();   npm install uuid //// Not used
//         this.orderNumber = `ORD-${timestamp}`
//     }

// });



const orders = mongoose.model('orders', ordersSchema);

module.exports = orders;