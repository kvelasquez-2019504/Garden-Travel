import Factura from "./factura.model.js";
import ReservarEvento from "../reservarEvento/reservarEvento.model.js";
import Reservacion from "../reservaciones/reservacion.model.js";
import paqueteServicioModel from "../paqueteServicios/paqueteServicio.model.js";
import Servicio from "../servicios/servicios.model.js";
import Usuario from "../usuarios/usuario.model.js";

export const crearFactura = async (req, res) => {
    const usuario = req.user;
    const { reservacion, reservacionEvento } = req.body;
    const idsReservacion = reservacion;
    const idsReservarEvento = reservacionEvento;
    const noBill = Math.floor(Math.random() * 1000000);

    async function sumarPreciosServicios() {
        let total = 0;
        
        const reservacionPromises = idsReservacion.map(async (id) => {
            const reservacion = await Reservacion.findById(id);
            total += reservacion.total;
        });
        
        const reservarEventoPromises = idsReservarEvento.map(async (id) => {
            const reservarEvento = await ReservarEvento.findById(id);
            const paqueteServicios = reservarEvento.paqueteServicio;
            
            const paquetePromises = paqueteServicios.map(async (id) => {
                const paqueteServicio = await paqueteServicioModel.findById(id);
                let idServicios = paqueteServicio.nombreServicio;
                
                const servicioPromises = idServicios.map(async (idServicio) => {
                    const servicio = await Servicio.findById(idServicio);
                    total += servicio.precio;
                });
                await Promise.all(servicioPromises);
            });
            await Promise.all(paquetePromises);
        });
        
        await Promise.all(reservacionPromises);
        await Promise.all(reservarEventoPromises);
        
        return total;
    }

    let total = await sumarPreciosServicios();
    
    const factura = new Factura({ noBill,usuario, reservacion, reservacionEvento, total });

    await factura.save();
    res.status(200).json({
        msg: "Factura creada exitosamente"
    });
}

export const obtenerOwnFacturas = async (req, res) => {
    const usuario = req.user;
    const facturas = await Factura.find({ usuario, estado: true }).populate("reservacion").populate("reservacionEvento").populate("usuario");
    res.status(200).json({ facturas});
}

export const obtenerFacturas = async (req, res) => {
    const facturas = await Factura.find({ estado: true }).populate("reservacion").populate("reservacionEvento").populate("usuario");
    res.status(200).json(facturas);
}

export const eliminarFactura = async (req, res) => {
    const { id } = req.body;
    await Factura.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        msg: "Factura eliminada exitosamente"
    });
}