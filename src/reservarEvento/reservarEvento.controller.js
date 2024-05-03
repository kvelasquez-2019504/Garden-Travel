import ReservarEvento from './reservarEvento.model.js';

export const listarReservarEventos = async (req, res) => {
    const reservarEventos = await ReservarEvento.find({ estado: true });
    res.status(200).json({
        reservarEventos
    });
}

export const crearReservarEvento = async (req, res) => {
    const { usuario, paqueteServicio, fechaInicio, fechaFin } = req.body;
    const reservarEvento = new ReservarEvento({ usuario, paqueteServicio, fechaInicio, fechaFin });

    await reservarEvento.save();
    res.status(200).json({
        msg: "Reservación de evento creada exitosamente"
    });
}

export const actualizarReservarEvento = async (req, res) => {
    const { id, ...rest } = req.body;
    await ReservarEvento
        .findByIdAndUpdate(id, rest);
    res.status(200).json({
        msg: "Reservación de evento actualizada exitosamente"
    });

}

export const eliminarReservarEvento = async (req, res) => {
    const { id } = req.body;
    await ReservarEvento
        .findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        msg: "Reservación de evento eliminada exitosamente"
    });
}

export const obtenerReservarEvento = async (req, res) => {
    const { id } = req.body;
    const reservarEvento = await ReservarEvento
        .findById(id)
        .populate('usuario')
        .populate('paqueteServicio');
    res.status(200).json({
        reservarEvento
    });
}

