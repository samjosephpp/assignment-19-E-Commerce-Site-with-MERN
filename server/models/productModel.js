const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({

    id : { type : Number , required : true  },
    name : { type: String, required : true, unique: true },
    price : { type : Number   },
    stockQty : { type: Number, default :0 },
    description : { type : String },
    category : { type : String },
    image : { type : String }

},  { timestamps: true} );


const Products = mongoose.model('products', productsSchema);

module.exports = {Products, productsSchema };