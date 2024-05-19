import Reservacion from './reservacion.model.js';
import TipoHabitacion from '../tipoHabitacion/tipoHabitacion.model.js';
import Servicio from '../servicios/servicios.model.js';
import paqueteServicioModel from '../paqueteServicios/paqueteServicio.model.js';

export const listarReservaciones = async (req, res) => {
    const reservaciones = await Reservacion.find();
    res.status(200).json({
        reservaciones
    });
}

export const crearReservacion = async (req, res) => {
    const usuario = req.user;
    const { habitacion, fechaInicio, fechaFin } = req.body;
    const tipoHabitacion = await TipoHabitacion.findById(habitacion);
    const tipoHabitacionPrecio = tipoHabitacion.precio;
    const idPaqueteServicios = tipoHabitacion.paqueteServicios;

    // function sumarPreciosServicios() {
    //     let total = 0;
    //     idPaqueteServicios.forEach(async (id) => {
    //         const paqueteServicio = await paqueteServicioModel.findById(id);
    //         let idServicios = paqueteServicio.nombreServicio;
    //         idServicios.forEach(async (idServicio) => {
    //             const servicio = await Servicio.findById(idServicio);
    //             total += servicio.precio;
    //             console.log("this is the total: ", total);
    //         });
    //     });
    //     return total;
    // }

    async function sumarPreciosServicios() {
        let total = 0;
        
        const paquetePromises = idPaqueteServicios.map(async (id) => {
            const paqueteServicio = await paqueteServicioModel.findById(id);
            let idServicios = paqueteServicio.nombreServicio;
            
            const servicioPromises = idServicios.map(async (idServicio) => {
                const servicio = await Servicio.findById(idServicio);
                total += servicio.precio;
                console.log("this is the total: ", total);
            });
            await Promise.all(servicioPromises);
        });
        
        await Promise.all(paquetePromises);
        
        return total + tipoHabitacionPrecio;
    }

    let total = await sumarPreciosServicios();
    
    const reservacion = new Reservacion({ usuario, habitacion, fechaInicio, fechaFin, total });

    await reservacion.save();
    res.status(200).json({
        msg: "Reservación creada exitosamente"
    });
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