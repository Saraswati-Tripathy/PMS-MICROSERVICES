const mongoose = require('mongoose');
const { ProductModel } = require('../models');
const csv = require('fast-csv'); // parses CSV files
const fs = require('fs');
const path = require('path');

//Dealing with data base operations

class ProductRepository {

    async ImportProduct() {
        const posts = [];
        await fs.createReadStream(path.join(__dirname, '/italian_restaurant.csv'))
        .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', function (data) {
                // mapping done to get correct column names we can pull neceesary column by setting proper headers 
                data['_id'] = new mongoose.Types.ObjectId();
                data['productName'] = (data.title);
                data['description'] = (data.explanation);
                data['category'] = (data.category);
                data['price'] = (data.price);
                data['SKU'] = (data.rating_count);
                data['StockLevel'] = (data.stock);
                posts.push(data);
            })
            .on('end', function () {
                // insert posts into db we can do precised function to get what all documents were inserted

                ProductModel.insertMany(posts).then(function () {
                    console.log("Successfully uploaded doc to DB");
                })
                    .catch(function (err) {
                        console.log(err);
                    });
                // return;
            });

// uploading can be done using multer / csv to json have taken normal import method the simplest one
    }


    async CreateProduct({ id, productName, link, image_link, ingredients, diet, pizza_type, category, price, sale_price, description, rating, SKU, stockLevel }) {

        const product = new ProductModel({
            id,
            productName,
            link,
            image_link,
            ingredients,
            diet,
            pizza_type,
            category,
            price,
            sale_price,
            description,
            rating,
            SKU,
            stockLevel
        })

        //    return await ProductModel.findByIdAndDelete('607286419f4a1007c1fa7f40');

        const productResult = await product.save();
        return productResult;
    }


    async Products() {
        return await ProductModel.find();
    }

    async FindByFilter(filter, sortBy) {
        const products = await ProductModel.find(filter).sort(sortBy)

        return products;
    }

    async FindById(id) {

        return await ProductModel.findById(id);

    }




    async FindSelectedProducts(selectedIds) {
        const products = await ProductModel.find().where('_id').in(selectedIds.map(_id => _id)).exec();
        return products;
    }

    async Recommendations(userInput) {
  // product recommendation is coming based on ingredients column as it has certain text in it 
        const query = { $text: { $search: userInput } };
        console.log(query);
        const products = await ProductModel.find(query);
        return products;
    }

}

module.exports = ProductRepository;
