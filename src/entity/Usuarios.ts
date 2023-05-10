import {
    Entity,
    ObjectIdColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { ObjectId } from 'mongodb'

@Entity({
    name: "usuarios",
    database: "usuarios"
})
export class Usuarios {
    @ObjectIdColumn()
    public _id?: ObjectId;

    @Column()
    public usuario?: string;

    @Column()
    public password?: string;

    @Column()
    public rol?: string;

    @CreateDateColumn({ type: "timestamp" })
    public fechaRegistro?: Date;

    @UpdateDateColumn({ type: "timestamp" })
    public fechaActualizacion?: Date;

    @Column({ default: false })
    public borrado?: boolean;
}
