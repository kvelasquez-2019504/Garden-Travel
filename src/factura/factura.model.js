import mongoose from "mongoose";

const FacturaSchema = mongoose.Schema({
    noBill: {
        type: Number,
        required: [true, "El número de factura es obligatorio"]
    },
    reservacion: {
        type: Array,
        required: [true, "La reservación es obligatoria"]
    },
    reservacionEvento: {
        type: Array,
        required: [true, "La reservación de evento es obligatoria"]
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, "El usuario es obligatorio"]
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
        required: [true, "La fecha es obligatoria"]
    },
    estado: {
        type: Boolean,
        default: true
    },
    total: {
        type: Number,
        required: [true, "El total es obligatorio"]
    }
});

export default mongoose.model("Factura", FacturaSchema);