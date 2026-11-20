import { Router } from "express";
import {
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    removeProduct
} from "../controllers/product.controller.js";

import {
    validateId,
    validateProduct
} from "../middlewares/middleware.js";

const router = Router();

// GET all products
router.get("/", getProducts);

// GET product by id
router.get("/:id", validateId, getProduct);

// POST product
router.post("/", validateProduct, addProduct);

// PUT product
router.put("/", validateProduct, editProduct);

// DELETE product
router.delete("/:id", validateId, removeProduct);

export default router;