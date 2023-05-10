import {
    Entity,
    ObjectIdColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { ObjectId } from 'mongodb'

@Entity({
    name: "categoria",
    database: "categoria"
})
export class Categoria {
    @ObjectIdColumn()
    public _id?: ObjectId;

    @Column()
    public categoria?: string;

    @CreateDateColumn({ type: "timestamp" })
    public fechaRegistro?: Date;

    @UpdateDateColumn({ type: "timestamp" })
    public fechaActualizacion?: Date;

    @Column({ default: false })
    public borrado?: boolean;
}
