import { Router } from "express";
import { check } from "express-validator";
import { login } from "./auth.controller.js";
import { validarJWT } from "../helpers/validar-jwt.js";
import { validar } from "../middlewares/validate-field.js";

const router = Router();

//Login
router.post(
    '/login',
    [
        check('email', 'El userName es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validar
    ],
    login
)


export default router;