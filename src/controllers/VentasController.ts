import { Request, Response } from "express";
import { Ventas } from "../entity/Ventas";
import { BeautyReturn } from "../helper/beauty-return";
import { ObjectId } from 'mongodb';

export class VentasController {

    public static getVentas = async (req: Request, res: Response) => {
        try {
            const ventas = req.orm.getRepository(Ventas)
            res.status(200).json(BeautyReturn(200, await ventas.find({
                where: {
                    borrado: false
                }
            })))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static findVentas = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const ventas = req.orm.getRepository(Ventas)
            const find  = await ventas.findOneBy({
                _id: new ObjectId(req.params.id)
            })

            if(!find)
                throw "Id no encontrado"
            
            res.status(200).json(BeautyReturn(200, find))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static insertVentas = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            if(!body)
                throw "Ingrese datos validos"

            const ventas = req.orm.getRepository(Ventas)
            const ventas_new = new Ventas()
            ventas_new.idUsuario = body.idUsuario
            ventas_new.listaProductos = body.listaProductos
            ventas_new.fechaRegistro = new Date()
            ventas_new.borrado = false
            const insert  = await ventas.save(ventas_new)

            if(!insert._id)
                throw "Falla en el registro"

            res.status(200).json(BeautyReturn(200, insert))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static updateVentas = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const ventas = req.orm.getRepository(Ventas)
            const find = await ventas.findOneBy({
                _id: new ObjectId(req.params.id)
            })

            if(!find)
                throw "Id no encontrado"

            const body = req.body;
            if(body.listaProductos)
                find.listaProductos = body.listaProductos
            if(body.idUsuario)
                find.idUsuario = body.idUsuario
            
            const update  = await ventas.save(find)

            if(!update._id)
                throw "Falla en actualizar el registro"
            
            res.status(200).json(BeautyReturn(200, "Actualizado con éxito"))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static deleteVentas = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const ventas = req.orm.getRepository(Ventas)
            const find = await ventas.findOneBy({
                _id: new ObjectId(req.params.id)
            })

            if(!find)
                throw "Id no encontrado"

            find.borrado = true
            const update  = await ventas.save(find)

            if(!update._id)
                throw "Falla al eliminar el registro"

            res.status(200).json(BeautyReturn(200, "Eliminado con éxito"))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };
}
