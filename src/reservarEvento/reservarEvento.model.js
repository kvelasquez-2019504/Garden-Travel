import mongoose from "mongoose";

const ReservarEventoSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, "El usuario es obligatorio"]
    },
    paqueteServico: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "PaqueteServicio",
        required: [true, "El paquete de servicio es obligatorio"]
    },
    fechaInicio: {
        type: Date,
        required: [true, "La fecha de inicio es obligatoria"]
    },
    fechaFin: {
        type: Date,
        required: [true, "La fecha de fin es obligatoria"]
    },
    estado: {
        type: String,
        enum: ["PENDIENTE", "CONFIRMADA", "CANCELADA"],
        default: "PENDIENTE"
    },
});

export default mongoose.model("ReservarEvento", ReservarEventoSchema);