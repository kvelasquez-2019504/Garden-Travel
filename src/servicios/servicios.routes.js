import { Router } from "express";
import { check } from "express-validator"
import {
    createServicio,
    deleteServicio,
    getServicios,
    updateServicio
} from "./servicios.controller.js"

const router = Router()

router.get("/", getServicios)

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("precio", "El precio es obligatorio").not().isEmpty()
    ],
    createServicio
)

router.put(
    "/",
    [
        check("id", "No es un ID valido").isMongoId(),
    ],
    updateServicio
)

router.delete(
    "/",
    [
        check("id", "No es un ID valido").isMongoId(),
    ],
    deleteServicio
)

export default router;