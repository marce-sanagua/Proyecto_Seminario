//Importaciones
import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";
import {loggerUrl} from "./src/api/middlewares/middleware.js";
import { validateId, validateProduct } from "./src/api/middlewares/middleware.js";
import { productRoutes } from "./src/api/routes/index.js";

//Config
const app= express();
const PORT = environments.port;

app.use(cors());

app.use(loggerUrl);


app.use(express.json()); 

app.use("/api/products", productRoutes);


//Endpoints
app.get("/", (req,res) => {
    res.send ("Hola mundo")
});

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});