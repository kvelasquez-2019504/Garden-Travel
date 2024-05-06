import { check } from "express-validator";
import { Router } from "express";
import { validarCampos } from "../middlewares/validarCampos.js";
import { listarReservarEventos, crearReservarEvento, actualizarReservarEvento, eliminarReservarEvento } from "./reservarEvento.controller.js";

const router = Router();

router.get("/listarReservarEventos", listarReservarEventos);

router.post("/crearReservarEvento", [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('paqueteServicio', 'El paquete de servicios es obligatorio').not().isEmpty(),
    check('fechaInicio', 'La fecha de inicio es obligatoria').not().isEmpty(),
    check('fechaFin', 'La fecha de fin es obligatoria').not().isEmpty(),
    validarCampos
], crearReservarEvento);

router.put("/actualizarReservarEvento/:id", [
    check("id", "No es un ID valido").isMongoId(),
    validarCampos
], actualizarReservarEvento);

router.delete("/eliminarReservarEvento/:id", [
    check("id", "No es un ID valido").isMongoId(),
    validarCampos
], eliminarReservarEvento);

export default router;

