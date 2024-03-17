const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ShoppingService {

    constructor(){
        this.repository = new ShoppingRepository();
    }

    async GetCart({ _id }){
        
        const cartItems = await this.repository.Cart(_id);
        return FormateData(cartItems);
    }


    async PlaceOrder(userInput){

        const { _id, txnNumber } = userInput

        const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
        
        return FormateData(orderResult);
    }

    async GetOrders(customerId){
        
        const orders = await this.repository.Orders(customerId);
        return FormateData(orders)
    }

    async GetOrderDetails({ _id,orderId }){
        const orders = await this.repository.Orders(productId);
        return FormateData(orders)
    }


    async ManageCart(customerId, item,qty, isRemove){

        const cartResult = await this.repository.AddCartItem(customerId,item,qty, isRemove);
        return FormateData(cartResult);
    }
     


}

module.exports = ShoppingService;
