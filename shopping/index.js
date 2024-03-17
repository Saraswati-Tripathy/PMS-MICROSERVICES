const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req,res,next) => {

    return res.status(200).json({"message": "Hello from Shopping microservices"})
})


app.listen(3003, () => {
    console.log('Shopping is Listening to Port 3003')
})