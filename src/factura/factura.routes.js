import { Router } from "express";
import { check } from "express-validator";
import { validar } from "../middlewares/validate-field.js";

import { crearFactura, obtenerFacturas, eliminarFactura} from "./factura.controller.js";
import { validarJWT } from "../helpers/validar-jwt.js";

const router = Router();

router.get('/listar', obtenerFacturas);

router.post('/crear', [
    validarJWT,
    check('reservacion', 'El id de la reservacion es obligatorio').not().isEmpty(),
    check('reservacionEvento', 'El id del reservar evento es obligatorio').not().isEmpty(),
    validar
], crearFactura);

router.delete('/eliminar', [    
    check('id', 'El id de la factura es obligatorio').not().isEmpty(),
    validar
], eliminarFactura);



export default router;
