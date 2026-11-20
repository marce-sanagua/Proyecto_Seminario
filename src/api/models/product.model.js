import connection from "../database/db.js";

// Obtener todos los productos
const getAllProducts = async () => {
    const sql = "SELECT * FROM products";
    const [rows] = await connection.query(sql);

    return rows;
};

// Obtener un producto por ID
const getProductById = async (id) => {
    const sql = "SELECT * FROM products WHERE products.id = ?";
    const [rows] = await connection.query(sql, [id]);

    return rows[0];
};

// Crear un producto
const createProduct = async (name, image, category, price) => {
    const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";
    const [result] = await connection.query(sql, [name, image, category, price]);

    return result.insertId;
};

// Actualizar un producto
const updateProduct = async (id, name, image, price, category) => {
    const sql = "UPDATE products SET name=?, image=?, price=?, category=? WHERE id=?";
    const [result] = await connection.query(sql, [name, image, price, category, id]);

    return result;
};

// Eliminar un producto
const deleteProduct = async (id) => {
    const sql = "DELETE FROM products WHERE id = ?";
    const [result] = await connection.query(sql, [id]);

    return result;
};

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};