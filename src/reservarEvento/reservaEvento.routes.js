import { check } from "express-validator";
import { Router } from "express";
import { validar } from "../middlewares/validate-field.js";
import { listarReservarEventos, crearReservarEvento, actualizarReservarEvento, eliminarReservarEvento } from "./reservarEvento.controller.js";
import { validarJWT } from "../helpers/validar-jwt.js";

const router = Router();

router.get("/listar", listarReservarEventos);

router.post("/crear", [
    validarJWT,
    check('paqueteServicio', 'El paquete de servicios es obligatorio').not().isEmpty(),
    check('fechaInicio', 'La fecha de inicio es obligatoria').not().isEmpty(),
    check('fechaFin', 'La fecha de fin es obligatoria').not().isEmpty(),
    validar
], crearReservarEvento);

router.put("/actualizar", [
    check("id", "No es un ID valido").isMongoId(),
    validar
], actualizarReservarEvento);

router.delete("/eliminar", [
    check("id", "No es un ID valido").isMongoId(),
    validar
], eliminarReservarEvento);

export default router;

