import { Router } from "express";
import { check } from "express-validator"
import {
    getPaqueteServicios,
    createPaqueteServicio,
    updatePaqueteServicio,
    deletePaqueteServicio
} from "./paqueteServicios.controller.js"
import { validarCampos } from "../middlewares/validarCampos.js";
const router = Router()

router.get("/", getPaqueteServicios)

router.post("/", createPaqueteServicio)

router.put("/", [check("id", "No es un ID valido").isMongoId(), validarCampos], updatePaqueteServicio)

router.delete("/", [check("id", "No es un ID valido").isMongoId(), validarCampos], deletePaqueteServicio)

export default router;