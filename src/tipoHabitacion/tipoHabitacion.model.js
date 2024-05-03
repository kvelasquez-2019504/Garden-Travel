import mongoose from "mongoose";

const tipoHabitacionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    paqueteServicios: {
        type: Array,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('TipoHabitacion', tipoHabitacionSchema);