import { Router } from "express";
import { check } from "express-validator";
import {
    crearUsuario,
    eliminarUsuario,
    listarUsuarios,
    actualizarUsuario,
    updateOwnUser,
    deleteOwnUser

} from "./usuario.controller.js";
import { validar } from "../middlewares/validate-field.js";
import { validarJWT } from "../helpers/validar-jwt.js";

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
  "/update",
  [
    validarJWT,
    validar
  ],
  updateOwnUser
);

router.delete(
  "/delete",
  [
    validarJWT,
    validar,
  ],
  deleteOwnUser
);

export default router;