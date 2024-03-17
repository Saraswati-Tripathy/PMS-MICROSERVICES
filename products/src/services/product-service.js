const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ProductService {

    constructor() {
        this.repository = new ProductRepository();
    }

    async ImportProduct() {

        const productResult = await this.repository.ImportProduct()
        return FormateData(productResult);
    }

    //    this is not in task but below endpoint is if we are creating product by inserting data manually either from 
    //    imaginary ecommerce plateform or from postman directly

    async CreateProduct(productInputs) {

        const productResult = await this.repository.CreateProduct(productInputs)
        return FormateData(productResult);
    }

    async GetProducts() {
        const products = await this.repository.Products();
        return FormateData({
            products
        })

    }

    async GetProductsByFilter(filter, sortBy) {

        const products = await this.repository.FindByFilter(filter, sortBy);
        return FormateData(products)

    }

    async GetProductDescription(productId) {

        const product = await this.repository.FindById(productId);
        return FormateData(product)
    }

    async GetSelectedProducts(selectedIds) {

        const products = await this.repository.FindSelectedProducts(selectedIds);
        return FormateData(products);
    }

    async GetRecommendations(userInput){
        
        const orders = await this.repository.Recommendations(userInput);
        return FormateData(orders)
    }

    
}

module.exports = ProductService;
