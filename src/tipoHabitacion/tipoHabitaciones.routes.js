import { Router } from "express";
import { check } from "express-validator"
import { validar } from "../middlewares/validate-field.js";
import {
    listarTipoHabitaciones,
    crearTipoHabitacion,
    actualizarTipoHabitacion,
    eliminarTipoHabitacion
} from "./tipoHabitaciones.controller.js"

const router = Router()

// Listar tipo de habitaciones, la función listarTipoHabitaciones trae todos los tipos de habitaciones de la base de datos
router.get("/lista", listarTipoHabitaciones)

// Crear tipo de habitacion, la función crearTipoHabitacion crea un nuevo tipo de habitacion en la base de datos
//VALIDACIONES FALTANTES: UsuarioCreador
router.post(
    '/agregar',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('paqueteServicios', 'El paquete de servicios es obligatorio').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        validar
    ],
    crearTipoHabitacion
)

// Actualizar tipo de habitacion, la función actualizarTipoHabitacion actualiza un tipo de habitacion en la base de datos
// VALIDACIONES FALTANTES: UsuarioCreador
router.put(
    '/actualizar',
    [
        check('id', 'No es un ID válido').isMongoId(),
        validar
    ],
    actualizarTipoHabitacion
)

// Eliminar tipo de habitacion, la función eliminarTipoHabitacion elimina un tipo de habitacion de la base de datos
// VALIDACIONES FALTANTES: UsuarioCreador
router.delete(
    '/eliminar',
    [
        check('id', 'No es un ID válido').isMongoId(),
        validar
    ],
    eliminarTipoHabitacion
)
export default router;