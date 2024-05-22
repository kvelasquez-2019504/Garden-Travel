import Reservacion from './reservacion.model.js';
import TipoHabitacion from '../tipoHabitacion/tipoHabitacion.model.js';
import Servicio from '../servicios/servicios.model.js';
import PaqueteServicio from '../paqueteServicios/paqueteServicio.model.js';

export const listarReservaciones = async (req, res) => {
    const reservaciones = await Reservacion.find();
    res.status(200).json({
        reservaciones
    });
}

export const crearReservacion = async (req, res) => {
    try {
        const usuario = req.user; 
        const { habitaciones, fechaInicio, fechaFin } = req.body;

        async function calcularTotalReservacion(habitaciones) {
            let total = 0;

            for (let i = 0; i < habitaciones.length; i++) {
                const habitacion = habitaciones[i];
                const tipoHabitacion = await TipoHabitacion.findById(habitacion.tipoHabitacion);
                console.log(tipoHabitacion);

                if (!tipoHabitacion) {
                    throw new Error(`Tipo de habitación con ID ${habitacion.tipoHabitacion} no encontrado`);
                }

                const paqueteServicios = tipoHabitacion.paqueteServicios;
                if (!paqueteServicios) {
                    throw new Error(`Paquete de servicios no definido para el tipo de habitación con ID ${habitacion.tipoHabitacion}`);
                }

                let subtotal = tipoHabitacion.precio * habitacion.cantidad;

                const paqueteServicio = await PaqueteServicio.findById(paqueteServicios);
                if (!paqueteServicio) {
                    throw new Error(`Paquete de servicios con ID ${paqueteServicios} no encontrado`);
                }

                const idServicios = paqueteServicio.nombreServicio;
                const servicios = await Servicio.find({ '_id': { $in: idServicios } });
                servicios.forEach(servicio => {
                    subtotal += servicio.precio * habitacion.cantidad;
                });

                total += subtotal;
            }

            return total;
        }

        const total = await calcularTotalReservacion(habitaciones);

        const reservacion = new Reservacion({ 
            usuario, 
            habitaciones, 
            fechaInicio, 
            fechaFin, 
            total 
        });

        await reservacion.save();
        res.status(200).json({
            msg: "Reservación creada exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}


export const actualizarReservacion = async (req, res) => {
    const { id, ...rest } = req.body;
    await Reservacion.findByIdAndUpdate(id, rest);
    res.status(200).json({
        msg: "Reservación actualizada exitosamente"
    });
}

export const eliminarReservacion = async (req, res) => {
    const { id } = req.body
    await Reservacion.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        msg: "Reservación cancelada exitosamente"
    });
}

export const obtenerReservacion = async (req, res) => {
    const { id } = req.body;
    const reservacion = await Reservacion
        .findById(id)
        .populate('usuario')
        .populate('habitacion');
    res.status(200).json({
        reservacion
    });
}