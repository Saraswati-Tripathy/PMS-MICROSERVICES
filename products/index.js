const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req,res,next) => {

    return res.status(200).json({"message": "Hello from Products microservices through gateway"})
})


app.listen(3001, () => {
    console.log('Products microservices is Listening to Port 3001')
})