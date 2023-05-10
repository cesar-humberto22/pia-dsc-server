import {
    Entity,
    ObjectIdColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { ObjectId } from 'mongodb'
import { Categoria } from "./Categoria";

@Entity({
    name: "productos",
    database: "productos"
})
export class Productos {
    @ObjectIdColumn()
    public _id?: ObjectId;

    @Column()
    public idCategoria?: number;

    @Column()
    public name?: string;

    @CreateDateColumn({ type: "timestamp" })
    public fechaRegistro?: Date;

    @UpdateDateColumn({ type: "timestamp" })
    public fechaActualizacion?: Date;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    public precio?: number;

    @Column()
    public num_inventario?: number;

    @ManyToOne(type => Categoria)
    @JoinColumn()
    public categoria?: Categoria;

    @Column({ default: false })
    public borrado?: boolean;
}