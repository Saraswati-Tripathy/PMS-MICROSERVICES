# PMS_Microservices
A Sample Microservices Test Task Repositories with sample dtaa set


The service exposes the following endpoints:
Import product feed:
This should take a product feed in the common product feed format (*.csv) and
import product data .
List products:
Provide a list of all products available in the shop. The product list should be filterable and orderable by
price, SKU, timestamp of last update, stock level, and product name.
Sell products:
This endpoint is used by an order microservices when an order is placed and keeps track of the stock as
well as which products are bought together.
Product Recommendations:
This API endpoint facilitates product recommendations and recommends products that are typically
bought together. It receives one SKU as an input and outputs a number of products that are
recommended to be bought together with this product.


project is deployable with correct data set and urls ports and slight changes 

# small docker note just a sample
FROM node

WORKDIR /shopping

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]
