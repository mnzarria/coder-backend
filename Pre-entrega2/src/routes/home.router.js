import { Router } from "express";
import productsRouter from './products.router.js'
import cartsRouter from './carts.router.js'
import viewsRouter from './views.router.js'

const router = Router()

router.use('/views',viewsRouter)
router.use('/products',productsRouter)
router.use('/carts',cartsRouter)

router.get("/", async (req, res) => {
    try {
      res.render("home", {
        style: "home.css",
        title: "Home"});
    } catch (error) {
      console.log(error);
      res.status(500).json("product search error");
    }
  });

export default router