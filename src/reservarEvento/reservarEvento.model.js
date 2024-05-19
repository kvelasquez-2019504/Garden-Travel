import mongoose from "mongoose";

const ReservarEventoSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, "El usuario es obligatorio"]
    },
    paqueteServicio: {
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
        type: Boolean,
        default: true
    },
});

export default mongoose.model("ReservarEvento", ReservarEventoSchema);