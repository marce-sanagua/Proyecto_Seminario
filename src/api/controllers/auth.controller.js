import bcrypt from "bcrypt";
import { getUserByEmail } from "../models/users.model.js";

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render("login", {
                error: "Todos los campos son obligatorios"
            });
        }

        const user = await getUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).render("login", {
                error: "Credenciales incorrectas"
            });
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