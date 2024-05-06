import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validarCampos.js";
import { listarReservaciones, crearReservacion, actualizarReservacion, eliminarReservacion } from "./reservacion.controller.js"

const router = Router()

router.get("/listarReservaciones", listarReservaciones)

router.post("/crearReservacion", crearReservacion)

router.put("/actualizarReservacion/:id", [check("id", "No es un ID valido").isMongoId(), validarCampos], actualizarReservacion)

router.delete("/eliminarReservacion/:id", [check("id", "No es un ID valido").isMongoId(), validarCampos], eliminarReservacion)

export default router;



