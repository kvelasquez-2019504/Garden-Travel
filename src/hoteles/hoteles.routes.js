import { Router } from "express";
import { check } from "express-validator"
import {
    listarHoteles,
    crearHotel,
    actualizarHotel,
    eliminarHotel
} from "./hoteles.controller.js"
import { validarCampos } from "../middlewares/validarCampos.js";

const router = Router()

// Listar hoteles, la función listarHoteles trae todos los hoteles de la base de datos
router.get("/lista", listarHoteles)

// Crear hotel, la función crearHotel crea un nuevo hotel en la base de datos
router.post(
    '/agregar',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('direccion', 'La dirección es obligatoria').not().isEmpty(),
        check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearHotel
)

// Actualizar hotel, la función actualizarHotel actualiza un hotel en la base de datos
router.put(
    '/actualizar',
    [
        check('id', 'No es un ID válido').isMongoId(),
        validarCampos
    ],
    actualizarHotel
)

// Eliminar hotel, la función eliminarHotel elimina un hotel de la base de datos
router.delete(
    '/eliminar',
    [
        check('id', 'No es un ID válido').isMongoId(),
        validarCampos
    ],
    eliminarHotel
)

export default router;