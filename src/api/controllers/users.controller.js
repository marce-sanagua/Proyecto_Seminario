import bcrypt from "bcrypt";
import { getUserByEmail, createUser } from "../models/users.model.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).render("register", {
                error: "Todos los campos son obligatorios"
            });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(409).render("register", {
                error: "Este correo electrónico ya está registrado"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await createUser(name, email, hashedPassword);

        res.redirect("/login");

    } catch (error) {
        console.log("Error al registrar usuario:", error);

        res.status(500).render("register", {
            error: "Error interno del servidor"
        });
    }
};

export {
    registerUser
};