import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController";

const router = Router();

/**
 * @swagger
 * /api/v1/categoria/:
 *   get:
 *     tags:
 *       - Categoria
 *     summary: Obtener la lista de categorías
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
router.get("/", CategoriaController.getCategoria);

/**
 * @swagger
 * /api/v1/categoria/{id}:
 *   get:
 *     tags:
 *       - Categoria
 *     summary: Obtener una categoría
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
router.get("/:id", CategoriaController.findCategoria);

/**
 * @swagger
 * /api/v1/categoria/:
 *   post:
 *     tags:
 *       - Categoria
 *     summary: Crear una categoría
 *     produces:
 *          - applications/json
 *     parameters:
 *       - in: body
 *         name: Categoria
 *         description: Objeto JSON que contiene los detalles del categoría.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             categoria:
 *               type: string
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
router.post("/", CategoriaController.insertCategoria);

/**
 * @swagger
 * /api/v1/categoria/{id}:
 *   put:
 *     tags:
 *       - Categoria
 *     summary: Actualizar usuario
 *     produces:
 *          - applications/json
 *     parameters: 
 *         - name: id
 *           in: path
 *           type: string
 *         - in: body
 *           name: Categoria
 *           description: Objeto JSON que contiene los detalles del categoria.
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               categoria:
 *                 type: string
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
router.put("/:id", CategoriaController.updateCategoria);

/**
 * @swagger
 * /api/v1/categoria/{id}:
 *   delete:
 *     tags:
 *       - Categoria
 *     summary: Eliminar categoria
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
router.delete("/:id", CategoriaController.deleteCategoria);

export const categoriaRouter = router;
