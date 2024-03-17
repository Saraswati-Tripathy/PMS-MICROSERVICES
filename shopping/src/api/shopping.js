const ShoppingService = require("../services/shopping-service");
const UserAuth = require('./middlewares/auth');

module.exports = (app) => {

    const service = new ShoppingService();

    // ENDPOINTS FOR ORDER PLACEMENT
    // middleware UserAuth is required for customer validation removed 
    // for testing purpose or we can generate token and test but its time taking 

    app.post('/order', async (req, res, next) => {

        const { _id } = req.user;
        const { txnNumber } = req.body;

        const { data } = await service.PlaceOrder({ _id, txnNumber });

        const payload = await service.GetOrderPayload(_id, data, 'CREATE_ORDER')

        res.status(200).json(data);

    });

    //Endpoint to get all the orders details

    app.get('/orders', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { data } = await service.GetOrders(_id);

        res.status(200).json(data);

    });


    // cart related api endpoints
    app.put('/cart', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { data } = await service.AddToCart(_id, req.body._id);

        res.status(200).json(data);

    });

    app.delete('/cart/:id', UserAuth, async (req, res, next) => {

        const { _id } = req.user;


        const { data } = await service.AddToCart(_id, req.body._id);

        res.status(200).json(data);

    });

    app.get('/cart', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { data } = await service.GetCart({ _id });

        return res.status(200).json(data);
    });

    app.get('/whoami', (req, res, next) => {
        return res.status(200).json({ msg: '/shoping : I am Shopping Service' })
    })

}
