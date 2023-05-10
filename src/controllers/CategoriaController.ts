import { Request, Response } from "express";
import { Categoria } from "../entity/Categoria";
import { BeautyReturn } from "../helper/beauty-return";
import { ObjectId } from 'mongodb';

export class CategoriaController {

    public static getCategoria = async (req: Request, res: Response) => {
        try {
            const categoria = req.orm.getRepository(Categoria)
            res.status(200).json(BeautyReturn(200, await categoria.find({
                where: {
                    borrado: false
                }
            })))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static findCategoria = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const categoria = req.orm.getRepository(Categoria)
            const find  = await categoria.findOneBy({
                _id: new ObjectId(req.params.id)
            })

            if(!find)
                throw "Id no encontrado"
            
            res.status(200).json(BeautyReturn(200, find))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static insertCategoria = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            if(!body)
                throw "Ingrese datos validos"

            const categoria = req.orm.getRepository(Categoria)
            const categoria_new = new Categoria()
            categoria_new.categoria = body.categoria
            categoria_new.fechaRegistro = new Date()
            categoria_new.fechaActualizacion = new Date()
            categoria_new.borrado = false
            const insert  = await categoria.save(categoria_new)

            if(!insert._id)
                throw "Falla en el registro"

            res.status(200).json(BeautyReturn(200, insert))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static updateCategoria = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const categoria = req.orm.getRepository(Categoria)
            const find = await categoria.findOneBy({
                _id: new ObjectId(req.params.id)
            })

            if(!find)
                throw "Id no encontrado"

            const body = req.body;
            if(body.categoria)
                find.categoria = body.categoria
            
            const update  = await categoria.save(find)

            if(!update._id)
                throw "Falla en actualizar el registro"
            
            res.status(200).json(BeautyReturn(200, "Actualizado con éxito"))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static deleteCategoria = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const categoria = req.orm.getRepository(Categoria)
            const find = await categoria.findOneBy({
                _id: new ObjectId(req.params.id)
            })

            if(!find)
                throw "Id no encontrado"

            find.borrado = true
            const update  = await categoria.save(find)

            if(!update._id)
                throw "Falla al eliminar el registro"

            res.status(200).json(BeautyReturn(200, "Eliminado con éxito"))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };
}
