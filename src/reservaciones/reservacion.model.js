import mongoose from "mongoose";

const ReservacionSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, "El usuario es obligatorio"]
    },
    habitaciones: [{
        tipoHabitacion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TipoHabitacion',
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        }
    }],
    fechaInicio: {
        type: Date,
        default: Date.now,
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
    total: {
        type: Number,
        required: [true, "El total es obligatorio"]
    }
});

export default mongoose.model("Reservacion", ReservacionSchema);