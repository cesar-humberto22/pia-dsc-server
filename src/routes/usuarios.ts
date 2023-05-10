import { Router } from "express";
import { UsuariosController } from "../controllers/UsuariosController";

const router = Router();

/**
 * @swagger
 * /api/v1/usuarios/:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener la lista de usuarios
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
router.get("/", UsuariosController.getUsuarios);

/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener usuario
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
router.get("/:id", UsuariosController.findUsuarios);

/**
 * @swagger
 * /api/v1/usuarios/:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Crear usuario
 *     produces:
 *          - applications/json
 *     parameters:
 *       - in: body
 *         name: Usuario
 *         description: Objeto JSON que contiene los detalles del usuario.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             usuario:
 *               type: string
 *             password:
 *               type: string
 *             rol:
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
router.post("/", UsuariosController.insertUsuarios);

/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Actualizar usuario
 *     produces:
 *          - applications/json
 *     parameters: 
 *         - name: id
 *           in: path
 *           type: string
 *         - in: body
 *           name: Usuario
 *           description: Objeto JSON que contiene los detalles del usuario.
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
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
router.put("/:id", UsuariosController.updateUsuarios);

/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Eliminar usuario
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
router.delete("/:id", UsuariosController.deleteUsuarios);

export const usuariosRouter = router;
