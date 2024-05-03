import { Router } from "express";
import { check } from "express-validator";
import { validar } from "../middlewares/validate-field.js";

import { listarFacturas, crearFactura, actualizarFactura } from "./factura.controller.js";

const router = Router();

router.get('/listaFacturas', listarFacturas);

router.post('/crearFactura', [
    validar
], crearFactura);

router.put('/actualizarFactura/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    validar
], actualizarFactura);

export default router;
