import { Router } from "express";
import { ProductoController } from "../controllers/ProductosController";

const router = Router();

/**
 * @swagger
 * /api/v1/productos/:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener la lista de productos
 *     produces:
 *          - applications/json
 *     responses:
 *       200:
 *         description: Proceso exitoso
 *       400:
 *         description: Datos incorrectos
 *       401: 
 *         description: Token incorrecto   
 *       403:
 *         description: Token expirado
 *       500:
 *         description: Algún error del servidor
 */
router.get("/", ProductoController.getProductos);

/**
 * @swagger
 * /api/v1/productos/{id}:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener un producto
 *     produces:
 *          - applications/json
 *     parameters: 
 *         - name: id
 *           in: path
 *           type: string
 *     responses:
 *       200:
 *         description: Proceso exitoso
 *       400:
 *         description: Datos incorrectos
 *       401: 
 *         description: Token incorrecto   
 *       403:
 *         description: Token expirado
 *       500:
 *         description: Algún error del servidor
 */
router.get("/:id", ProductoController.findProductos);

/**
 * @swagger
 * /api/v1/productos/:
 *   post:
 *     tags:
 *       - Productos
 *     summary: Crear producto
 *     produces:
 *          - applications/json
 *     parameters:
 *       - in: body
 *         name: Producto
 *         description: Objeto JSON que contiene los detalles del producto.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             idCategoria:
 *               type: number
 *             name:
 *               type: string
 *             precio:
 *               type: number
 *             num_inventario:
 *               type: number
 *     responses:
 *       200:
 *         description: Proceso exitoso
 *       400:
 *         description: Datos incorrectos
 *       401: 
 *         description: Token incorrecto   
 *       403:
 *         description: Token expirado
 *       500:
 *         description: Algún error del servidor
 */
router.post("/", ProductoController.insertProductos);

/**
 * @swagger
 * /api/v1/productos/{id}:
 *   put:
 *     tags:
 *       - Productos
 *     summary: Actualizar producto
 *     produces:
 *          - applications/json
 *     parameters: 
 *         - name: id
 *           in: path
 *           type: string
 *         - in: body
 *           name: Producto
 *           description: Objeto JSON que contiene los detalles del producto.
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               idCategoria:
 *                 type: number
 *                 required: false
 *               name:
 *                 type: string
 *                 required: false
 *               precio:
 *                 type: number
 *                 required: false
 *               num_inventario:
 *                 type: number
 *                 required: false
 *     responses:
 *       200:
 *         description: Proceso exitoso
 *       400:
 *         description: Datos incorrectos
 *       401: 
 *         description: Token incorrecto   
 *       403:
 *         description: Token expirado
 *       500:
 *         description: Algún error del servidor
 */
router.put("/:id", ProductoController.updateProductos);

/**
 * @swagger
 * /api/v1/productos/{id}:
 *   delete:
 *     tags:
 *       - Productos
 *     summary: Eliminar producto
 *     produces:
 *          - applications/json
 *     parameters: 
 *         - name: id
 *           in: path
 *           type: string
 *     responses:
 *       200:
 *         description: Proceso exitoso
 *       400:
 *         description: Datos incorrectos
 *       401: 
 *         description: Token incorrecto   
 *       403:
 *         description: Token expirado
 *       500:
 *         description: Algún error del servidor
 */
router.delete("/:id", ProductoController.deleteProductos);

export const productosRouter = router;
