import { Router } from "express";
import { requireLogin } from "../middlewares/middleware.js";
const router = Router();

router.get("/principal", requireLogin, (req, res) => {
    res.render("index");
})

router.get("/consultar", requireLogin, (req, res) => {
    res.render("get");
})

router.get("/crear", requireLogin, (req, res) => {
    res.render("post");
})

router.get("/modificar", requireLogin, (req, res) => {
    res.render("put");
})

router.get("/eliminar", requireLogin, (req, res) => {
    res.render("delete");
})

export default router;