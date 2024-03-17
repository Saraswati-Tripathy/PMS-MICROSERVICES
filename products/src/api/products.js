const ProductService = require("../services/product-service");

module.exports = (app) => {
  const service = new ProductService();

  //import products from csv
  app.post("/product/product-feed", async (req, res, next) => {
    //check validation if any
    try {
      const { data } = await service.ImportProduct();
      return res.json(data);

    } catch (error) {
      return res.status(404).json({ error });
    }
  });

  // create products 
  app.post("/product/create", async (req, res, next) => {
    const { id, productName, link, image_link, ingredients, diet, pizza_type,
      category, price, sale_price, description, rating, SKU, stockLevel } =
      req.body;
    // validation
    const { data } = await service.CreateProduct({
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
    });
    return res.json(data);
  });


  //get products
  app.get("/product", async (req, res, next) => {
    //check validation
    try {
      const { data } = await service.GetProducts();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error });
    }
  });


  // product list filterable endpoint if no filter will idealy give all results .
  app.get("/product/search", async (req, res, next) => {

    // we can also apply object destruction method and bind it in query object 
    // this is simple straight forward method to get data
    const filters = req.query;

    let sort = req.query.sort || "price";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = 1;
    }

    try {
      const { data } = await service.GetProductsByFilter(filters, sortBy);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error });
    }
  });


  app.get("/:id", async (req, res, next) => {
    const productId = req.params.id;

    try {
      const { data } = await service.GetProductDescription(productId);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error });
    }
  });

  app.post("/ids", async (req, res, next) => {
    const { ids } = req.body;
    const products = await service.GetSelectedProducts(ids);
    return res.status(200).json(products);
  });

  // Endpoint to get product recommmendations
  app.get("/product/recommendations", async (req, res, next) => {
    const { SKU } = req.body;
    const { data } = await service.GetRecommendations(SKU);

    res.status(200).json(data);
  });

  // just to test if service is getting called 
  app.get("/whoami", (req, res, next) => {
    return res
      .status(200)
      .json({ msg: "/ or /products : I am products Service" });
  });

};
