'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import servicioRoutes from '../src/servicios/servicios.routes.js'
import paqueteServicioRoutes from '../src/paqueteServicios/paqueteServicio.routes.js'
import authRoutes from '../src/auth/auth.routes.js'

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.serviciosPath = '/GardenTravel/v1/servicio'
        this.paqueteServicioRoutes = '/GardenTravel/v1/paqueteServicio'
        this.authPath = '/GardenTravel/v1/auth'

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.serviciosPath, servicioRoutes)
        this.app.use(this.paqueteServicioRoutes, paqueteServicioRoutes)
        this.app.use(this.authPath, authRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        });
    }
}

export default Server;