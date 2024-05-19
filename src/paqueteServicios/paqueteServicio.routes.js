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

router.get("/listar", 
    getPaqueteServicios)

router.post("/agregar", createPaqueteServicio)

router.put("/actualizar", [check("id", "No es un ID valido").isMongoId(), validar], updatePaqueteServicio)

router.delete("/eliminar", [check("id", "No es un ID valido").isMongoId(), validar], deletePaqueteServicio)

export default router;