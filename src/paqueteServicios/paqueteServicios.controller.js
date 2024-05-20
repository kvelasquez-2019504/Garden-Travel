import { response, request } from "express";
import PaqueteServicio from "./paqueteServicio.model.js"


export const getPaqueteServicios = async (req = request, res = response) => {
    const { limite, desde } = req.body;
    const query = { state: true }

    const [total, paqueteServicio] = await Promise.all([
        PaqueteServicio.countDocuments(query),
        PaqueteServicio.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('nombreServicio')
    ])

    res.status(200).json({
        total,
        paqueteServicio
    })
}


export const createPaqueteServicio = async (req, res) => {
    const { nombrePservicio, nombreServicio, img } = req.body;
    const paqueteServicio = new PaqueteServicio({ nombrePservicio, nombreServicio, img })

    await paqueteServicio.save();

    res.status(200).json({
        paqueteServicio
    })
}

export const updatePaqueteServicio = async (req, res) => {

    const { id } = req.body;
    const { _id, ...rest } = req.body;

    await PaqueteServicio.findByIdAndUpdate(id, rest)

    const paqueteServicio = await PaqueteServicio.findOne({ _id: id });

    res.status(200).json({
        msg: "PaqueteServicio Actualizado exitosamente",
        paqueteServicio,
    });

}

export const deletePaqueteServicio = async (req, res) => {
    const { id } = req.body;
    await PaqueteServicio.findByIdAndUpdate(id, { state: false })

    const paqueteServicio = await PaqueteServicio.findOne({ _id: id })

    res.status(200).json({
        msg: "PaqueteServicio eliminado exitosamente",
        paqueteServicio,
    });
}