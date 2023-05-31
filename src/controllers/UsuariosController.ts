import { Request, Response } from "express";
import { Usuarios } from "../entity/Usuarios";
import { BeautyReturn } from "../helper/beauty-return";
import { ObjectId } from 'mongodb';
import { generateAccessToken, getToken } from "../helper/jwt";

export class UsuariosController {

    public static getUsuarios = async (req: Request, res: Response) => {
        try {
            const usuarios = req.orm.getMongoRepository(Usuarios)
            res.status(200).json(BeautyReturn(200, await usuarios.find({
                where: {
                    borrado: false
                }
            })))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static getMe = async (req: Request, res: Response) => {
        try {
            const authHeader = req.headers['cookie']
            const token = authHeader && authHeader.split('=')[1]
            const accessToken = await getToken(token)

            if(!accessToken || !Object.keys(accessToken).length)
                throw "Error en el token"

            
            const usuarios = req.orm.getMongoRepository(Usuarios)
            const findUsuario = await usuarios.findOne({
                where: {
                    borrado: false,
                    usuario: accessToken.usuario
                }
            });

            if(!findUsuario)
                throw "Error: usuario no encontrado";

            if(!(findUsuario.password === accessToken.password))
                throw "Error: contraseña incorrecta";

            res.status(200).json(BeautyReturn(200, { ...findUsuario, token: token }))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    }

    public static getLogin = async (req: Request, res: Response) => {
        try {
            const usuarios = req.orm.getMongoRepository(Usuarios)
            const findUsuario = await usuarios.findOne({
                where: {
                    borrado: false,
                    usuario: req.body.usuario
                }
            });

            if(!findUsuario)
                throw "Error: usuario no encontrado";

            if(!findUsuario.password || findUsuario.password === null){
                throw "Cambiar contraseña"
            }else if(!(findUsuario.password === req.body.password))
                throw "Error: contraseña incorrecta";


            findUsuario.ip = req.socket.remoteAddress;
            usuarios.save(findUsuario);

            const token = await generateAccessToken(req.body);
            res.cookie("Banner", token, {
                httpOnly: false,
                sameSite: "none",
                secure: true,
                expires: false,
                maxAge: 2147483647
            })

            res.status(200).json(BeautyReturn(200, {
                ...findUsuario,
                token: await generateAccessToken(req.body)
            }))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static getRegister = async (req: Request, res: Response) => {
        try {
            
            const body = req.body;
            if(!body)
                throw "Ingrese datos validos"

            const usuarios = req.orm.getMongoRepository(Usuarios)


            const findUsuario = await usuarios.findOne({
                where: {
                    borrado: false,
                    usuario: body.tuition
                }
            });

            if(findUsuario)
                throw "Error: Matricula existente"

            const usuarionew = new Usuarios()
            usuarionew.usuario = body.tuition
            usuarionew.rol = "Estudiante"
            usuarionew.fechaRegistro = new Date()
            usuarionew.fechaActualizacion = new Date()
            usuarionew.nombres = body.firstName
            usuarionew.apellidos = body.lastName
            usuarionew.matricula = body.tuition
            usuarionew.edad = body.age
            usuarionew.ip = req.socket.remoteAddress
            usuarionew.borrado = false
            const insert  = await usuarios.save(usuarionew)

            if(!insert._id)
                throw "Error: usuario no creado";

            res.status(200).json(BeautyReturn(200, usuarionew))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static getChangePassword = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            if(!body)
                throw "Ingrese datos validos"

            const usuarios = req.orm.getMongoRepository(Usuarios)
            const findUsuario = await usuarios.findOne({
                where: {
                    borrado: false,
                    usuario: body.usuario
                }
            });

            if(!findUsuario)
                throw "Error: Matricula o usuario no existente"

            findUsuario.password = body.password
            await usuarios.save(findUsuario)

            if(!findUsuario._id)
                throw "Error: usuario no creado";

            res.status(200).json(BeautyReturn(200, findUsuario))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static findUsuarios = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const usuario = req.orm.getMongoRepository(Usuarios)
            const find  = await usuario.findOneBy({
                _id: new ObjectId(req.params.id)
            })

            if(!find)
                throw "Id no encontrado"
            
            res.status(200).json(BeautyReturn(200, find))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static insertUsuarios = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            if(!body)
                throw "Ingrese datos validos"

            const usuario = req.orm.getMongoRepository(Usuarios)
            const usuarionew = new Usuarios()
            usuarionew.usuario = body.usuario
            usuarionew.password = body.password
            usuarionew.rol = body.rol
            usuarionew.fechaRegistro = new Date()
            usuarionew.fechaActualizacion = new Date()
            usuarionew.nombres = body.nombres
            usuarionew.apellidos = body.apellidos
            usuarionew.matricula = body.matricula
            usuarionew.edad = body.edad
            usuarionew.ip = body.ip
            usuarionew.borrado = false
            const insert  = await usuario.save(usuarionew)

            if(!insert._id)
                throw "Falla en el registro"

            res.status(200).json(BeautyReturn(200, insert))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static updateUsuarios = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const usuario = req.orm.getMongoRepository(Usuarios)
            const find = await usuario.findOneBy({
                _id: new ObjectId(req.params.id)
            })

            if(!find)
                throw "Id no encontrado"

            const body = req.body;
            if(body.usuario)
                find.usuario = body.usuario
            if(body.rol)
                find.rol = body.rol
            if(body.nombres)
                find.nombres = body.nombres
            if(body.apellidos)
                find.apellidos = body.apellidos
            if(body.matricula)
                find.matricula = body.matricula
            if(body.edad)
                find.edad = body.edad
            if(body.ip)
                find.ip = body.ip
            
            const update  = await usuario.save(find)

            if(!update._id)
                throw "Falla en actualizar el registro"
            
            res.status(200).json(BeautyReturn(200, "Actualizado con éxito"))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static deleteUsuarios = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const usuario = req.orm.getMongoRepository(Usuarios)
            const find = await usuario.findOneBy({
                _id: new ObjectId(req.params.id)
            })

            if(!find)
                throw "Id no encontrado"

            find.borrado = true
            const update  = await usuario.save(find)

            if(!update._id)
                throw "Falla al eliminar el registro"

            res.status(200).json(BeautyReturn(200, "Eliminado con éxito"))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };
}
