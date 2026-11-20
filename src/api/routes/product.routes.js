import {Router} from "express";
const router = Router();
import connection from "../database/db.js";
import {validateId, validateProduct} from "../middlewares/middleware.js";


//GET all products
router.get("/", async (req,res) => {
    try {
        const sql= "SELECT * FROM products";
        const[rows] = await connection.query(sql);

        if(rows.length===0){
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }
        

        res.status(200).json({
            payload:rows
        })

    }catch (error) {
        console.log("Error obteniendo productos: ", error.message);

        res.status(500).json({
            message:"Error interno al obtener productos"
        });

    }

});

//GET product by id
router.get("/:id", validateId, async (req, res) =>{
    try{
        
        const sql = "SELECT * FROM products WHERE products.id = ?";
        const [rows] = await connection.query(sql, [req.id]);

        if(rows.length === 0){
            return res.status(404).json({
                message: `No se encontro producto con id: ${req.id}`
            });
        }

        res.status(200).json({
        payload: rows[0]
      });

    }catch (error) {
        console.log("Error obteniendo producto con id: ", error);

        res.status(500).json({
            message: "Error interno del servidor al obtener producto"
        });

    }
});


router.post("/", validateProduct, async (req, res) => {
    
    try {
        
        const {category, image, name, price} =req.body
        
        const sql ="INSERT INTO products (name, image, category, price) VALUES (?,?,?,?)";

        const[rows] = await connection.query(sql, [name, image, category, price]);

        
        return res.status(201).json({
            message:"Producto creado con exito",
            productId: rows.insertId

        });

    }catch (error) {
      console.log(error);

       res.status(500).json({
            message: "Error interno del servidor al crear producto"
        });
    }
});

router.put("/", validateProduct, async (req,res) => {

    try{

        const {id,name,image,price,category} =req.body;

        const sql ="UPDATE  products SET name=?, image=?, price=?, category=? WHERE id=?";
        const [result] = await connection.query (sql,[name, image, price, category, id]);

        if (result.changedRows === 0) {
            return res.status(404).json({
                mesagge: "No se actualizo el producto"
            });

        }

        return res.status(200).json({
            message: "Producto actualizado correctamente"
    });


    }catch (error){
        console.log(error);

       res.status(500).json({
            message: "Error interno del servidor al crear producto"
        });
    

    }
    

});


router.delete("/:id", validateId, async (req,res) => {

    try {

        const sql = "DELETE FROM products WHERE id= ?";
        await connection.query(sql, [req.id]);

        res.status(200).json({
            message: `Producto con id ${req.id} eliminado correctamente`
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor al eliminar producto"
        });
    }
});



export default router;
