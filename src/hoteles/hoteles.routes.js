import { Router } from "express";
import { check } from "express-validator"
import {
    listarHoteles,
    crearHotel,
    actualizarHotel,
    eliminarHotel
} from "./hoteles.controller.js"

const router = Router()

// Listar hoteles, la función listarHoteles trae todos los hoteles de la base de datos
router.get("/lista", listarHoteles)

// Crear hotel, la función crearHotel crea un nuevo hotel en la base de datos
router.post(
    '/agregar',
    [

    ],
    crearHotel
)

// Actualizar hotel, la función actualizarHotel actualiza un hotel en la base de datos
router.put(
    '/actualizar',
    [

    ],
    actualizarHotel
)

// Eliminar hotel, la función eliminarHotel elimina un hotel de la base de datos
router.delete(
    '/eliminar',
    [

    ],
    eliminarHotel
)

export default router;