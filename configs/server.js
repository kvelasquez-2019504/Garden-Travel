'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import servicioRoutes from '../src/servicios/servicios.routes.js'
import paqueteServicioRoutes from '../src/paqueteServicios/paqueteServicio.routes.js'
import hotelesRoutes from '../src/hoteles/hoteles.routes.js'
import tipoHabitacion from '../src/tipoHabitacion/tipoHabitaciones.routes.js'
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.serviciosPath = '/GardenTravel/v1/servicio'
        this.paqueteServicioRoutes = '/GardenTravel/v1/paqueteServicio'
        this.hotelesPath = '/GardenTravel/v1/hoteles'
        this.tipoHabitacionPath = '/GardenTravel/v1/tipoHabitacion'

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
        this.app.use(this.hotelesPath, hotelesRoutes)
        this.app.use(this.tipoHabitacionPath, tipoHabitacion)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        });
    }
}

export default Server;