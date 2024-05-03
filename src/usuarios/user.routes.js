import { Router } from "express";
import { check } from "express-validator";
import {
    crearUsuario,
    eliminarUsuario,
    listarUsuarios,
    actualizarUsuario

} from "./user.controller.js";
import { validar } from "../middlewares/validate-field.js";

const router = Router();

router.get("/", listarUsuarios);

router.post(
  "/crearUsuario",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
    validar,
  ],
  crearUsuario
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    validar,
  ],
  actualizarUsuario
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    validar,
  ],
  eliminarUsuario
);

export default router;