import {
    Entity,
    ObjectIdColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { ObjectId } from 'mongodb'
import { Usuarios } from "./Usuarios";
import { Productos } from "./Productos";


export class ListadoVentas {
    @ObjectIdColumn()
    public id?: number;

    @Column()
    public idProducto?: ObjectId;

    @Column()
    public cantidad?: number;
}


@Entity({
    name: "ventas",
    database: "ventas"
})
export class Ventas {
    @ObjectIdColumn()
    public _id?: ObjectId;

    @Column()
    public idUsuario?: ObjectId;

    @Column({ type: "simple-array" })
    public listaProductos?: ListadoVentas[];

    @Column()
    public subtotal?: number;

    @Column()
    public iva?: number;

    @Column()
    public ivaSubtotal?: number;

    @Column()
    public total?: number;

    @CreateDateColumn({ type: "timestamp" })
    public fechaRegistro?: Date;

    @Column()
    public fechaEmision?: Date;

    @Column({ default: false })
    public borrado?: boolean;

    @ManyToOne(type => Usuarios)
    @JoinColumn()
    public usuario?: Usuarios;

    @ManyToOne(type => Productos)
    @JoinColumn()
    public listaProductosDatos?: Productos[];
}
