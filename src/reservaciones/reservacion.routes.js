import { Router } from "express";
import { check } from "express-validator"
import { validar } from "../middlewares/validate-field.js";
import { listarReservaciones, crearReservacion, actualizarReservacion, eliminarReservacion } from "./reservacion.controller.js"

const router = Router()

router.get("/listarReservaciones", listarReservaciones)

router.post("/crearReservacion", crearReservacion)

router.put("/actualizarReservacion/:id", [check("id", "No es un ID valido").isMongoId(), validar], actualizarReservacion)

router.delete("/eliminarReservacion/:id", [check("id", "No es un ID valido").isMongoId(), validar], eliminarReservacion)

export default router;



