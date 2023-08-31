import { Router } from "express";
import ProductManager from "../dao/ProductManagerMongo.js";
import CartManager from "../dao/CartManagerMongo.js";
import { __dirname } from "../utils/dirname.js";

const router = Router();

const path = __dirname + "/productos.json";

const productManager = new ProductManager();

router.get("/chat", (req, res) => {
  res.render("chat", {
    style: "chat.css",
    title: "Chat",
  });
});

// Endpoint para ver un producto en particular
router.get("/products/:id", async (req, res) => {
  const productManager = new ProductManager();
  const product = await productManager.getProductById(req.params.id);
  const { _id, title, description, price, code, stock, category, thumbnails } =
    product;
  res.render("product", {
    id: _id,
    title,
    description,
    price,
    code,
    stock,
    category,
    thumbnails,
  });
});

// Vistas estáticas paginadas
router.get("/products", async (req, res) => {
  const productManager = new ProductManager();
  const products = await productManager.getProducts(3);
  res.render("products", { products });
});

router.get("/products/page/:page", async (req, res) => {
  const page = req.params.page || 1;
  const productManager = new ProductManager();
  const products = await productManager.getProducts(3, page);
  res.render("products", { products });
});

// Vistas dinámicas paginadas
router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts(4);
  res.render("realTimeProducts", {
    style: "home.css",
    title: "Productos dinámicos",
    products: products,
  });
});

router.get("/realTimeProducts/page/:page", async (req, res) => {
  const page = req.params.page || 1;
  const productManager = new ProductManager();
  const products = await productManager.getProducts(4, page);
  res.render("realTimeProducts", {
    style: "home.css",
    title: "Productos dinámicos",
    products: products,
  });
});

// Ruta para ver carrito
router.get("/carts/:cid", async (req, res) => {
  const cartManager = new CartManager();
  const cart = await cartManager.getCartById(req.params.cid);

  const { products } = cart;

  res.render("cart", { products });
});



export default router;
