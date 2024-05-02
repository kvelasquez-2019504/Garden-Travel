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
    habitaciones: {
        type: Array,
        required: [true, "Las abitaciones son obligatorias"]
    },
    habOcupadas: {
        type: Array,
        required: [true, "Las abitaciones ocupadas son obligatorias"]
    },
    estado: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("Hotel", HotelSchema);