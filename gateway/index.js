const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/shopping", proxy("http://localhost:3003")); // shopping microservices
app.use("/", proxy("http://localhost:3001")); // products microservicess

app.listen(3000, () => {
  console.log("Gateway is Listening to Port 3000");
});
