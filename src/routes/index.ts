import { Router } from "express";
import { productosRouter } from "./productos";
import { categoriaRouter } from "./categoria";
import { usuariosRouter } from "./usuarios";
import { ventasRouter } from "./ventas";

const routes = Router();

routes.use("/productos", productosRouter);
routes.use("/categoria", categoriaRouter);
routes.use("/usuarios", usuariosRouter);
routes.use("/ventas", ventasRouter);

export default routes;
