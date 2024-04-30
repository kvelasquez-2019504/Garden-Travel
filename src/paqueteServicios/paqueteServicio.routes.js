import { Router } from "express";
import { check } from "express-validator"
import {
    getPaqueteServicios,
    createPaqueteServicio,
    updatePaqueteServicio,
    deletePaqueteServicio
} from "./paqueteServicios.controller.js"

const router = Router()

router.get("/", getPaqueteServicios)

router.post("/", createPaqueteServicio)

router.put("/", [check("id", "No es un ID valido").isMongoId()], updatePaqueteServicio)

router.delete("/", [check("id", "No es un ID valido").isMongoId()], deletePaqueteServicio)

export default router;