const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next(); // Pasamos al siguiente middleware
}



const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "El ID debe ser un numero entero positivo"
        });
    }
    req.id = id;
    next();
}


// Middleware para validar los productos enviados en un <form>
const validateProduct = (req, res, next) => {
    const categoriasValidas = ["food", "drink"];
    const errores = []; // Creamos un array vacio de errores
    const {name, image, price, category} = req.body;
    
    
    if (!name || !image || !price || !category) {
        errores.push("Faltan campos requeridos");
    }

    
    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos dos caracteres");
    }

    
    if (typeof price !== "number" || price <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    
    if (!categoriasValidas.includes(category)) {
        errores.push("Categoria invalida");
    }

    
    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos",
            listaErrores: errores
        });
    }

    next();
}

const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
}



export {
    loggerUrl,
    validateId,
    validateProduct,
    requireLogin
}