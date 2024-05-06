import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";

import { listarFacturas, crearFactura, actualizarFactura } from "./factura.controller.js";

const router = Router();

router.get('/listaFacturas', listarFacturas);

router.post('/crearFactura', [
    validarCampos
], crearFactura);

router.put('/actualizarFactura/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    validarCampos
], actualizarFactura);

export default router;
