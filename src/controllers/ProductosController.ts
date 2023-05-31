import fs from 'fs';
import { Request, Response } from "express";
import { Productos } from "../entity/Productos";
import { BeautyReturn } from "../helper/beauty-return";
import { ObjectId } from 'mongodb';

export class ProductoController {

    public static getProductos = async (req: Request, res: Response) => {
        try {
            const query = req.query;
            let filter = {};

            if(query.search){
                const expresion = new RegExp(`.*${query.search}.*`, 'gi')
                filter = {
                    nombre: expresion
                }
            }

            const products = req.orm.getMongoRepository(Productos)
            const productos = await products.aggregate([
                {
                    $match: Object.keys(filter).length? {$and: [{ borrado: false }, filter]}: { borrado: false }
                },
                {
                    $lookup:{
                        from: "categoria",
                        localField: "idCategoria",
                        foreignField: "_id",
                        as: "categoria",
                    }
                }, {
                    $unwind: {
                        path: "$categoria"
                    }
                }
            ]);

            res.status(200).json(BeautyReturn(200, await productos.toArray()))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static getImgProductos = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"
                
            const products = req.orm.getMongoRepository(Productos)
            let find:any = await products.aggregate([
                {
                    $match: {
                        borrado: false,
                        _id: new ObjectId(req.params.id)
                    }
                },
                {
                    $lookup:{
                        from: "categoria",
                        localField: "idCategoria",
                        foreignField: "_id",
                        as: "categoria",
                    }
                }, {
                    $unwind: {
                        path: "$categoria"
                    }
                }
            ]);
            find = (await find.toArray())[0]
            
            if(!find || !find.imagen)
                throw "Ingrese un id valido"

            const image = find.imagen as any

            fs.readFile(image.fileBase64, (err, data) => {
                if (err) {
                    console.error(err);
                    res.status(404).send(BeautyReturn(404, 'Imagen no encontrada'));
                    return;
                }
            
                // Establecer el encabezado Content-Type como image/png (puedes adaptarlo según la extensión del archivo)
                res.set('Content-Type', image.fileType);
                res.send(data);
            });

        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static findProductos = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const products = req.orm.getMongoRepository(Productos)
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

            const products = req.orm.getMongoRepository(Productos)
            const producto = new Productos()
            producto.idCategoria =  new ObjectId(body.idCategoria)
            producto.nombre = body.nombre
            producto.imagen = undefined;
            producto.color = body.color
            producto.unidad = body.unidad
            producto.precio = body.precio
            producto.num_inventario = body.num_inventario
            producto.borrado = false
            producto.fechaRegistro = new Date()
            producto.fechaActualizacion = new Date()
            const insert  = await products.save(producto)

            if(!insert._id)
                throw "Falla en el registro"

            let imagen = body.imagen;
            const fileExtension = imagen.fileName.split('.').pop();
            const fileName = `${insert._id}.${fileExtension}`;
            const fileData = imagen.fileBase64.split(',')[1];
            const fileBuffer = Buffer.from(fileData, 'base64');
            const filePath = `./archives/${fileName}`;
            fs.writeFileSync(filePath, fileBuffer);

            imagen.fileBase64 = filePath;
            insert.imagen = imagen
            await products.save(insert)

            res.status(200).json(BeautyReturn(200, insert))
        } catch (error) {
            res.status(500).json(BeautyReturn(500, error))
        }
    };

    public static updateProductos = async (req: Request, res: Response) => {
        try {
            if(!req.params.id)
                throw "Ingrese un id valido"

            const products = req.orm.getMongoRepository(Productos)
            const find  = await products.findOneBy({
                _id: new ObjectId(req.params.id)
            })

            if(!find)
                throw "Id no encontrado"

            const body = req.body;
            if(body.idCategoria)
                find.idCategoria = new ObjectId(body.idCategoria)
            if(body.nombre)
                find.nombre = body.nombre
            if(body.unidad)
                find.unidad = body.unidad
            if(body.imagen){

                await fs.unlinkSync((find.imagen as any).fileBase64);
                let imagen = body.imagen;
                const fileExtension = imagen.fileName.split('.').pop();
                const fileName = `${find._id}.${fileExtension}`;
                const fileData = imagen.fileBase64.split(',')[1];
                const fileBuffer = Buffer.from(fileData, 'base64');
                const filePath = `./archives/${fileName}`;
                await fs.writeFileSync(filePath, fileBuffer);
    
                imagen.fileBase64 = filePath;
                find.imagen = body.imagen = imagen
            }
            if(body.color)
                find.color = body.color
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

            const products = req.orm.getMongoRepository(Productos)
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
