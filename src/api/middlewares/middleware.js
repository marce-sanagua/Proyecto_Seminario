const loggerUrl = (req, res, next) =>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();

}


const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0){
        return res.status(400).json({
            message: "El ID debe ser un numero entero positivo"

        });
    }

    req.id = id;
    next();
}


const validateProduct = (req, res, next) => {
    const categoriasValidas = ["food", "drink"];
    const errores= [];
    const {name, image, price, category} = req.body;


    if (!name || !image || !price || !category){
        errores.push("faltan campos requeridos");
    }


    if(typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }


    if(typeof price !== "number" || price <= 0){
        errores.push("El precio debe ser un numero mayor a cero");
    }


    if(!categoriasValidas.includes(category)){
        errores.push("Categoria invalida");

    }


    if(errores.length > 0){
        return res.status(400).json({
            message: "Datos invalidos",
            ListaErrores: errores
        });
    }

    next();
}

export {
    loggerUrl,
    validateId,
    validateProduct
}