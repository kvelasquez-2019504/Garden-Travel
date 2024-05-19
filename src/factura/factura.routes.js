import { Router } from "express";
import { check } from "express-validator";
import { validar } from "../middlewares/validate-field.js";

import { crearFactura} from "./factura.controller.js";
import { validarJWT } from "../helpers/validar-jwt.js";

const router = Router();

router.post('/crear', [
    validarJWT,
    check('reservacion', 'El id de la reservacion es obligatorio').not().isEmpty(),
    check('reservacionEvento', 'El id del reservar evento es obligatorio').not().isEmpty(),
    validar
], crearFactura);



export default router;
