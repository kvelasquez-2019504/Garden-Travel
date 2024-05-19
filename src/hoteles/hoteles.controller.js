import { response, request } from "express";
import Hotel from "./hotel.model.js";

// Listar hoteles (GET) 
export const listarHoteles = async (req, res) => {

    let hotelData;
    hotelData = await Hotel.find({ estado: true });

    res.status(200).json({
        hotelData
    })
}

// Crear hotel (POST)
export const crearHotel = async (req, res) => {

    const { nombre, direccion, telefono, estrellas, habitaciones, habOcupadas, img } = req.body;
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

