import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../models/product.model.js";

// GET all products
const getProducts = async (req, res) => {
    try {
        const rows = await getAllProducts();

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }

        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log("Error obteniendo productos: ", error.message);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
};

// GET product by id
const getProduct = async (req, res) => {
    try {
        const product = await getProductById(req.id);

        if (!product) {
            return res.status(404).json({
                message: `No se encontro producto con id: ${req.id}`
            });
        }

        res.status(200).json({
            payload: product
        });

    } catch (error) {
        console.log("Error obteniendo producto con id: ", error);

        res.status(500).json({
            message: "Error interno del servidor al obtener producto"
        });
    }
};

// POST product
const addProduct = async (req, res) => {
    try {
        const { category, image, name, price } = req.body;

        const productId = await createProduct(name, image, category, price);

        return res.status(201).json({
            message: "Producto creado con exito",
            productId
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor al crear producto"
        });
    }
};

// PUT product
const editProduct = async (req, res) => {
    try {
        const { id, name, image, price, category } = req.body;

        const result = await updateProduct(id, name, image, price, category);

        if (result.changedRows === 0) {
            return res.status(404).json({
                message: "No se actualizo el producto"
            });
        }

        return res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor al crear producto"
        });
    }
};

// DELETE product
const removeProduct = async (req, res) => {
    try {
        await deleteProduct(req.id);

        res.status(200).json({
            message: `Producto con id ${req.id} eliminado correctamente`
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor al eliminar producto"
        });
    }
};

export {
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    removeProduct
};