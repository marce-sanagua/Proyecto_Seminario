import { Router } from "express";
import { registerUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", registerUser);

export default router;