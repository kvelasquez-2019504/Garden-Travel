import { Router } from "express";
import { check } from "express-validator"
import { validar } from "../middlewares/validate-field.js";
import { listarReservaciones, crearReservacion, actualizarReservacion, eliminarReservacion, obtenerReservacion} from "./reservacion.controller.js"
import { validarJWT } from "../helpers/validar-jwt.js";

const router = Router()

router.get("/listar", listarReservaciones)
router.get("/obtener", obtenerReservacion);

router.post("/crear", [validarJWT], crearReservacion)

router.put("/actualizar", [check("id", "No es un ID valido").isMongoId(), validar], actualizarReservacion)

router.delete("/eliminar", [check("id", "No es un ID valido").isMongoId(), validar], eliminarReservacion)

export default router;



