const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
      id: {
            type: String,
            unique: true,
            required: true,
      },
      productName: String,
      link: String,
      image_link: String,
      ingredients: String,
      diet: String,
      pizza_type: String,
      category: String,
      price: Number,
      sale_price: String,
      description: String,
      rating: String,
      SKU: String,
      StockLevel: String
},
      { timestamps: true }
);

module.exports = mongoose.model('product', ProductSchema);