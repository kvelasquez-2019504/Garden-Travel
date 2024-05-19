import { response, request } from "express";
import Servicio from "./servicios.model.js"

export const getServicios = async (req = request, res = response) => {
    const { limite, desde } = req.body;
    const query = { state: true }

    const [total, servicios] = await Promise.all([
        Servicio.countDocuments(query),
        Servicio.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ])

    res.status(200).json({
        total,
        servicios
    })
}

export const createServicio = async (req, res) => {

    const { nombre, precio } = req.body;
    const servicio = new Servicio({ nombre, precio })

    await servicio.save();

    res.status(200).json({
        servicio
    })
}

export const updateServicio = async (req, res) => {

    const { _id, ...rest } = req.body;
    const id = _id;
    await Servicio.findByIdAndUpdate(id, rest)

    const servicio = await Servicio.findOne({ _id: id });

    res.status(200).json({
        msg: "Servicio Actualizado exitosamente",
        servicio,
    });

}

export const deleteServicio = async (req, res) => {
    const id = req.body.id;
    await Servicio.findByIdAndUpdate(id, { state: false })

    const servicio = await Servicio.findById(id);

    res.status(200).json({
        msg: "Servicio eliminado exitosamente",
        servicio,
    });
}