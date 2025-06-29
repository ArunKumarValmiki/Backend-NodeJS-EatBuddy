
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    category : {
        type : [{
            type : String,
            enum : ['veg', 'non-veg']
        }]
    },
    image : {
        type : String

    },
    bestSeller : {
        type : String

    },
    description : {
        type : String

    },

    // Relationship with Firm
    firm : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Firm'
    }]
})

const Product = new mongoose.model('Product', productSchema)

module.exports = Product