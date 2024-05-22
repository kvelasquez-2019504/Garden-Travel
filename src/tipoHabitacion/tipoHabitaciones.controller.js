import { response, request } from "express";
import TipoHabitacion from "./tipoHabitacion.model.js";
import PaqueteServicio from "../paqueteServicios/paqueteServicio.model.js";

// Listar tipo de habitaciones (GET)
export const listarTipoHabitaciones = async (req, res) => {
    const tipoHabitaciones = await TipoHabitacion.find({ estado: true }).
            populate('paqueteServicios', 'nombrePservicio')
        ;
    res.status(200).json({
        tipoHabitaciones
    });
}

// Crear tipo de habitacion (POST)
export const crearTipoHabitacion = async (req, res) => {
    const { nombre, paqueteServicios, precio } = req.body;
    const tipoHabitacion = new TipoHabitacion({ nombre, paqueteServicios, precio });
    await tipoHabitacion.save();
    res.status(200).json({
        msg: "Tipo de habitacion creado exitosamente"
    });
}

// Actualizar tipo de habitacion (PUT)
export const actualizarTipoHabitacion = async (req, res) => {
    const { id, ...rest } = req.body;
    await TipoHabitacion.findByIdAndUpdate(id, rest);
    res.status(200).json({
        msg: "Tipo de habitacion actualizado exitosamente"
    });
}

// Eliminar tipo de habitacion (DELETE)
export const eliminarTipoHabitacion = async (req, res) => {
    const { id } = req.body;
    await TipoHabitacion.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        msg: "Tipo de habitacion eliminado exitosamente"
    });
}