import mongoose from "mongoose";

const FacturaSchema = mongoose.Schema({
    reservacion: {
        type: Array,
        required: [true, "La reservación es obligatoria"]
    },
    usuario: {
        type: Array,
        required: [true, "El usuario es obligatorio"]
    },
    fecha: {
        type: Date,
        required: [true, "La fecha es obligatoria"]
    },
    total: {
        type: Number,
        required: [true, "El total es obligatorio"]
    }
});

export default mongoose.model("Factura", FacturaSchema);