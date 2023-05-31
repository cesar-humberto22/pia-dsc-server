import "reflect-metadata";
import express, { RequestHandler } from "express";
import helmet from "helmet";
import swaggerJsdoc from 'swagger-jsdoc';
import cors from "cors";
import routes from "./routes/";
import swaggerUi from 'swagger-ui-express';

import {DataSource} from "typeorm"

import {Productos} from "./entity/Productos";
import {Categoria} from "./entity/Categoria";
import {Usuarios} from "./entity/Usuarios";
import {Ventas} from "./entity/Ventas";

const AppDataSource = new DataSource({
    type: "mongodb",
    url: "mongodb+srv://cesar-charlize:6s34Qhd0stuqNajT@cluster0.e8oeovy.mongodb.net/app",
    entities: [Productos, Categoria, Usuarios, Ventas],
    synchronize: true,
    logging: false
})

AppDataSource
    .initialize()
    .then(async connection => {
        const app = express();

        app.use(cors({
            credentials: true,
            origin: ["http://192.168.100.5:5173", "http://192.168.1.74:5173"]
        }));
        //app.use(helmet());
        app.use(express.json({limit: "50mb"}) as RequestHandler);
        app.use(express.urlencoded({ extended: true }) as RequestHandler);
        app.use((req, res, next) => {
            res.set("Access-Control-Allow-Credentials", "true");
            res.set("Access-Control-Allow-Methods", "GET, POST");
            res.set("Access-Control-Allow-Headers", "Content-Type, *");
            req.orm = connection; // Aquí asignas el valor numérico a la propiedad orm
            return next();
        });

        const options: swaggerJsdoc.Options = {
            definition: {
                info: {
                    title: "API",
                    version: "1.0.0",
                    description: "Documentación de cada Endpoint",
                },
                schemes: [
                    "http",
                    "https"
                ],
                host: `localhost:3000`
            },
            // apis: ["./routes/*.{ts,js}"]
            apis: ["./src/routes/*.{ts,js,ts}"]
        };

        const specs = swaggerJsdoc(options);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

        app.use("/api/v1/", routes);

        app.listen(3000, () => {
            console.log("Server started on port 3000!");
        });
    })
    .catch(error => console.log(error));
