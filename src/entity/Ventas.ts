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

@Entity({
    name: "ventas",
    database: "ventas"
})
export class Ventas {
    @ObjectIdColumn()
    public _id?: ObjectId;

    @Column()
    public idUsuario?: number;

    @Column({ type: "simple-array" })
    public listaProductos?: number[];

    @CreateDateColumn({ type: "timestamp" })
    public fechaRegistro?: Date;

    @Column({ default: false })
    public borrado?: boolean;

    @ManyToOne(type => Usuarios)
    @JoinColumn()
    public usuario?: Usuarios;

    @ManyToOne(type => Productos)
    @JoinColumn()
    public listaProductosDatos?: Productos[];
}
