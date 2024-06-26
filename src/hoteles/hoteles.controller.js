import { response, request } from "express";
import Hotel from "./hotel.model.js";

// Listar hoteles (GET) 
export const listarHoteles = async (req, res) => {
    const hoteles = await Hotel.find();

    res.status(200).json({
        hoteles
    })
}

// Crear hotel (POST)
export const crearHotel = async (req, res) => {
    const { nombre, direccion, telefono, estrellas, habitaciones, habOcupadas, img } = req.body;

    if (habitaciones < habOcupadas) {
        return res.status(400).json({
            msg: "El número de habitaciones ocupadas no puede ser mayor al número de habitaciones"
        })
    }

    const hotel = new Hotel({ nombre, direccion, telefono, estrellas, habitaciones, habOcupadas, img })

    await hotel.save();

    res.status(200).json({
        msg: "Hotel creado exitosamente"
    })
}

// Actualizar hotel (PUT)
export const actualizarHotel = async (req, res) => {

    const { id, ...rest } = req.body;
    const hotel = await Hotel.findByIdAndUpdate(id, rest);

    res.status(200).json({
        msg: "Hotel actualizado exitosamente",
    })

}

// Eliminar hotel (DELETE)
export const eliminarHotel = async (req, res) => {

    const { id } = req.body;
    await Hotel.findByIdAndUpdate(id, { $set: { estado: false } });

    res.status(200).json({
        msg: "Hotel eliminado exitosamente"
    })
}

