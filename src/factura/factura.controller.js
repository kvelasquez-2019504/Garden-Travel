import Factura from "./factura.model.js";

export const crearFactura = async (req, res) => {
    try {
        const factura = new Factura(req.body);
        await factura.save();
        res.status(201).json(factura);
    } catch (error) {
        res.status(500).json({
            mensaje: "Ocurrio un error",
            error
        });
    }
};

export const listarFacturas = async (req, res) => {
    try {
        const facturas = await Factura.find();
        res.json(facturas);
    } catch (error) {
        res.status(500).json({
            mensaje: "Ocurrio un error",
            error
        });
    }
}

export const actualizarFactura = async (req, res) => {
    try {
        const factura = await Factura.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(factura);
    }
    catch (error) {
        res.status(500).json({
            mensaje: "Ocurrio un error",
            error
        });
    }
}

