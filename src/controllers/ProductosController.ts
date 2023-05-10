import { Request, Response } from "express";
import { Productos } from "../entity/Productos";
import { BeautyReturn } from "../helper/beauty-return";
import { ObjectId } from 'mongodb';

export class ProductoController {

    public static getProductos = async (req: Request, res: Response) => {
        try {
            const products = req.orm.getRepository(Productos)
            res.status(200).json(BeautyReturn(200, await products.find({
                where: {
                    borrado: false
                }
            })))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static findProductos = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const products = req.orm.getRepository(Productos)
            const find  = await products.findOneBy({
                _id: new ObjectId(req.params.id)
            })

            if(!find)
                throw "Id no encontrado"
            
            res.status(200).json(BeautyReturn(200, find))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static insertProductos = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            if(!body)
                throw "Ingrese datos validos"

            const products = req.orm.getRepository(Productos)
            const producto = new Productos()
            producto.idCategoria = body.idCategoria
            producto.name = body.name
            producto.precio = body.precio
            producto.num_inventario = body.num_inventario

            producto.borrado = false
            producto.fechaRegistro = new Date()
            producto.fechaActualizacion = new Date()
            
            const insert  = await products.save(producto)

            if(!insert._id)
                throw "Falla en el registro"

            res.status(200).json(BeautyReturn(200, insert))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static updateProductos = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const products = req.orm.getRepository(Productos)
            const find  = await products.findOneBy({
                _id: new ObjectId(req.params.id)
            })

            if(!find)
                throw "Id no encontrado"

            const body = req.body;
            if(body.idCategoria)
                find.idCategoria = body.idCategoria
            if(body.name)
                find.name = body.name
            if(body.precio)
                find.precio = body.precio
            if(body.num_inventario)
                find.num_inventario = body.num_inventario
            
            const update  = await products.save(find)

            if(!update._id)
                throw "Falla en actualizar el registro"
            
            res.status(200).json(BeautyReturn(200, "Actualizado con éxito"))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static deleteProductos = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const products = req.orm.getRepository(Productos)
            const find  = await products.findOneBy({
                _id: new ObjectId(req.params.id)
            })

            if(!find)
                throw "Id no encontrado"

            find.borrado = true
            const update  = await products.save(find)

            if(!update._id)
                throw "Falla al eliminar el registro"

            res.status(200).json(BeautyReturn(200, "Eliminado con éxito"))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };
}
