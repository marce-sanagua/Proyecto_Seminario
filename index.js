import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middleware.js";
import { authRoutes, productRoutes, viewRoutes, usersRoutes } from "./src/api/routes/index.js"
import { __dirname, join } from "./src/api/utils/index.js";
import session from "express-session";


const app = express();
const { port, session_key } = environments
const PORT = port;


app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));



app.use(express.static(join(__dirname, "src/public")));

app.use(cors()); 


app.use(loggerUrl);


app.use(express.json()); 


app.use(express.urlencoded({extended: true}));


app.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: true
}));

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);


app.use("/dashboard", viewRoutes);

app.use("/", authRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});