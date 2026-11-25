import bcrypt from "bcrypt";
import { getUserByEmail, updateUserPassword } from "../models/users.model.js";

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render("login", {
                error: "Todos los campos son obligatorios"
            });
        }

        const user = await getUserByEmail(email);

        if (!user) {
    return res.status(401).render("login", {
        error: "Credenciales incorrectas"
    });
}

const esHash = user.password.startsWith("$2");

if (esHash) {
    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).render("login", {
            error: "Credenciales incorrectas"
        });
    }
} else {
    if (password !== user.password) {
        return res.status(401).render("login", {
            error: "Credenciales incorrectas"
        });
    }

    const nuevoHash = await bcrypt.hash(password, 10);
    await updateUserPassword(user.id, nuevoHash);
}

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        res.redirect("/dashboard/principal");

    } catch (error) {
        console.log("Error en el login:", error);

        res.status(500).render("login", {
            error: "Error interno del servidor"
        });
    }
};

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Error al destruir la sesión:", err);

            return res.status(500).json({
                message: "Error al cerrar la sesión"
            });
        }

        res.redirect("/login");
    });
};

export {
    loginUser,
    logoutUser
};