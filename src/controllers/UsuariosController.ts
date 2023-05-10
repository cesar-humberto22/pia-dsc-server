import { Request, Response } from "express";
import { Usuarios } from "../entity/Usuarios";
import { BeautyReturn } from "../helper/beauty-return";
import { ObjectId } from 'mongodb';

export class UsuariosController {

    public static getUsuarios = async (req: Request, res: Response) => {
        try {
            const usuarios = req.orm.getRepository(Usuarios)
            res.status(200).json(BeautyReturn(200, await usuarios.find({
                where: {
                    borrado: false
                }
            })))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static findUsuarios = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const usuario = req.orm.getRepository(Usuarios)
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

            const usuario = req.orm.getRepository(Usuarios)
            const usuarionew = new Usuarios()
            usuarionew.usuario = body.usuario
            usuarionew.password = body.password
            usuarionew.rol = body.rol
            usuarionew.fechaRegistro = new Date()
            usuarionew.fechaActualizacion = new Date()
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

            const usuario = req.orm.getRepository(Usuarios)
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

            const usuario = req.orm.getRepository(Usuarios)
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
