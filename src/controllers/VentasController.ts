import { Request, Response } from "express";
import { Ventas } from "../entity/Ventas";
import { BeautyReturn } from "../helper/beauty-return";
import { ObjectId } from 'mongodb';
import { Productos } from "../entity/Productos";

export class VentasController {

    public static getVentas = async (req: Request, res: Response) => {
        try {
            const query = req.query;
            let filter = {};

            if(query.fecha){
                const gte = new Date(query.fecha)
                gte.setHours(0)
                gte.setMinutes(0)
                gte.setSeconds(0)

                const lt = new Date(query.fecha)
                lt.setHours(23)
                lt.setMinutes(59)
                lt.setSeconds(59)

                filter = {fechaEmision:{$gte: gte,$lt: lt}}
            }

            if(query.idUsuario){
                filter = {...filter, idUsuario: new ObjectId(query.idUsuario)}
            }

            const ventas = req.orm.getMongoRepository(Ventas)
            const listVentas = await ventas.aggregate([
                {
                    $match: Object.keys(filter).length? {$and: [{ borrado: false }, filter]}: { borrado: false }
                },
                {
                    $lookup:{
                        from: "usuarios",
                        localField: "idUsuario",
                        foreignField: "_id",
                        as: "usuario",
                    }
                }, {
                    $unwind: {
                        path: "$usuario"
                    }
                },
                {
                    $lookup:{
                        from: "productos",
                        localField: "listaProductos.idProducto",
                        foreignField: "_id",
                        as: "listaProductosDatos",
                    }
                }
            ]);

            res.status(200).json(BeautyReturn(200, await listVentas.toArray()))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static findVentas = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const ventas = req.orm.getMongoRepository(Ventas)
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

            const ventas = req.orm.getMongoRepository(Ventas)
            const productos = req.orm.getMongoRepository(Productos)
            const ventas_new = new Ventas()

            ventas_new.fechaEmision = new Date(body.fechaEmision)
            ventas_new.fechaRegistro = new Date()
            ventas_new.idUsuario = new ObjectId(body.idUsuario)
            ventas_new.iva = body.iva
            ventas_new.ivaSubtotal = body.ivaSubtotal
            ventas_new.total = body.total
            ventas_new.subtotal = body.subtotal
            ventas_new.borrado = false
            ventas_new.listaProductos = body.carrito.map((t: any) => ({
                id: t.id,
                idProducto: new ObjectId(t.producto.id),
                cantidad: parseInt(t.cantidad),
            }))

            const insert  = await ventas.save(ventas_new)

            if(!insert._id)
                throw "Falla en el registro"

            for (let index = 0; index < body.carrito.length; index++) {
                const element = body.carrito[index];
                const find  = await productos.findOneBy({
                    _id: new ObjectId(element.producto.id)
                })

                if(find){
                    find.num_inventario = (find.num_inventario || 0) - element.cantidad;
                    await productos.save(find)
                }
            }

            res.status(200).json(BeautyReturn(200, insert))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static updateVentas = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const ventas = req.orm.getMongoRepository(Ventas)
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

            const ventas = req.orm.getMongoRepository(Ventas)
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
