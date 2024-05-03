import { Router } from "express";
import { check } from "express-validator"
import {
    getPaqueteServicios,
    createPaqueteServicio,
    updatePaqueteServicio,
    deletePaqueteServicio
} from "./paqueteServicios.controller.js"
import { validar } from "../middlewares/validate-field.js";

const router = Router()

router.get("/", getPaqueteServicios)

router.post("/", createPaqueteServicio)

router.put("/", [check("id", "No es un ID valido").isMongoId(), validar], updatePaqueteServicio)

router.delete("/", [check("id", "No es un ID valido").isMongoId(), validar], deletePaqueteServicio)

export default router;