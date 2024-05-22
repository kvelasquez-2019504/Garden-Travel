import mongoose from "mongoose";

const HotelSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    direccion: {
        type: String,
        required: [true, "La dirección es obligatoria"]
    },
    telefono: {
        type: String,
        required: [true, "El teléfono es obligatorio"]
    },
    estrellas: {
        type: Number,
        required: [true, "Las estrellas son obligatorias"]
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
    habOcupadas: {
        type: Array,
        required: [true, "Las abitaciones ocupadas son obligatorias"]
    },
    img: {
        type: String,
        required: [true, "La imagen es obligatoria"]
    },
    estado: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("Hotel", HotelSchema);