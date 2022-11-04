
const express = require("express");
const { products } = require("./data/products.js");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
//const getProductRoute = require("./routes/getProduct")
const dotenv = require("dotenv");
dotenv.config();

//to avoid CORS cross origin errors since we will use react and node server
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


//to be able pass json data
app.use(express.json());


//routes
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", productRoute);
//app.use("/api", getProductRoute);

//connect to DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log(err));

//Affiche tous les produits (from : fichier donnée en dur)
app.get("/api/productss", (req, res) => {
  res.json(products);
});

//Affiche les 3 propriétés citées dans le code  
app.get("/api/productz", (req, res) => {
  const partsOfProduct = products.map((p) => {
    const { id, name, image, category } = p;
    return { id, name, image, category };
  });
  res.json(partsOfProduct);
});

// //single product
// app.get("/api/productz/:id", (req, res) => {
//   const singleProduct = products.find((p) => p.id === req.params.id);
//   res.json(singleProduct);
// });

// //Afficher uniquement que les catégories
// app.get("/api/productz/", (req, res) => {
//   const partsOfProduct = products.map((p) => {
//     const {category } = p;
//     return { category };
//   });
//   res.json(partsOfProduct);
// });

//Filtrer un critère dans la catégorie
app.get("/api/productz/category", (req, res) => {
  const sousCategorieProduct = products.findone((p) => p.chaise === req.params.chaise);
  res.json(sousCategorieProduct);
});


app.get("/", (req, res) => {
  res.send("API is running ...");
});

//launching a server
app.listen(process.env.PORT || 8000, () =>
  console.log("server running on 8000...")
);
