const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("internetM", "root", "", {
  dialect: "mysql",
  host: "localhost",
});
const { Op } = require("sequelize");

// Models
const Product = require("../db/schemas/product");

// Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/api/getProducts", (req, res) => {
  console.log("getProducts");

  const page = parseInt(req.body.page) || 0;
  const sort = parseInt(req.body.sort) || 0;
  const category = parseInt(req.body.category) || 0;
  const text = req.body.text || "";
  const limit = 3;
  const offset = page * limit;
  let orderSort = undefined;

  switch (sort) {
    case 0:
      orderSort = "price";
      break;
    case 1:
      orderSort = "rating";
      break;
    case 2:
      orderSort = "votes";
      break;
    default:
      orderSort = "price";
  }

  new Promise(async (resolve, reject) => {
    const products = await Product.findAll({
      offset,
      limit,
      order: [[orderSort, "DESC"]],
      where: {
        category: category === 0 ? [1, 2, 3, 4] : category,
        name: {
          [Op.like]: `%${text}%`,
        },
      },
      raw: true,
    });

    products ? resolve(products) : reject(products);
  })
    .then((success) => {
      res.send(success);
    })
    .catch((error) => res.send(error));
});

app.post("/api/getCountRowsInProduct", (req, res) => {
  console.log("getCountRowsInProduct");
  const id = req.body.id || [1, 2, 3, 4];
  const text = req.body.text || "";

  new Promise(async (resolve, reject) => {
    const count = await Product.count({
      where: {
        category: id,
        name: {
          [Op.like]: `%${text}%`,
        },
      },
    });

    count ? resolve(count) : reject(count);
  })
    .then((a) => res.send({ productsCount: a }))
    .catch((b) => res.send("Error getCountRowsInProduct"));
});

app.post("/api/getPaginatedProducts", (req, res) => {
  console.log("getPaginatedProducts");

  new Promise(async (resolve, reject) => {
    const products = await Product.findAll({
      offset: req.body.start,
      limit: req.body.end,
      raw: true,
    });

    products ? resolve(products) : reject(products);
  })
    .then((data) => res.send(data))
    .catch((data) => res.send(data));
});

app.post("/api/getProductById", (req, res) => {
  console.log("getProductById");

  const id = req.body.id || 1;

  new Promise(async (resolve, reject) => {
    const product = await Product.findByPk(id, { raw: true });

    product ? resolve(product) : reject(product);
  })
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

app.listen(3001, (err) => (err ? console.log(err) : console.log("All good!")));