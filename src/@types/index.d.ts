import {DataSource} from "typeorm"

declare global {
    namespace Express {
        export interface Request {
            orm: DataSource;
        }
    }
}
