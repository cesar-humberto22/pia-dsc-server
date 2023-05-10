import { Router } from "express";
import { VentasController } from "../controllers/VentasController";

const router = Router();

/**
 * @swagger
 * /api/v1/ventas/:
 *   get:
 *     tags:
 *       - Ventas
 *     summary: Obtener la lista de ventas
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
router.get("/", VentasController.getVentas);

/**
 * @swagger
 * /api/v1/ventas/{id}:
 *   get:
 *     tags:
 *       - Ventas
 *     summary: Obtener una venta
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
router.get("/:id", VentasController.findVentas);

/**
 * @swagger
 * /api/v1/ventas/:
 *   post:
 *     tags:
 *       - Ventas
 *     summary: Crear una venta
 *     produces:
 *          - applications/json
 *     parameters:
 *       - in: body
 *         name: Venta
 *         description: Objeto JSON que contiene los detalles del la venta.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             idUsuario:
 *               type: number
 *             listaProductos:
 *               type: Array
 *               items:
 *                  type: string
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
router.post("/", VentasController.insertVentas);

/**
 * @swagger
 * /api/v1/ventas/{id}:
 *   put:
 *     tags:
 *       - Ventas
 *     summary: Actualizar venta
 *     produces:
 *          - applications/json
 *     parameters: 
 *         - name: id
 *           in: path
 *           type: string
 *         - in: body
 *           name: Ventas
 *           description: Objeto JSON que contiene los detalles del ventas.
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: number
 *               listaProductos:
 *                 type: Array
 *                 items:
 *                    type: string
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
router.put("/:id", VentasController.updateVentas);

/**
 * @swagger
 * /api/v1/ventas/{id}:
 *   delete:
 *     tags:
 *       - Ventas
 *     summary: Eliminar una venta
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
router.delete("/:id", VentasController.deleteVentas);

export const ventasRouter = router;
