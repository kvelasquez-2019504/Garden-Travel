import mongoose from "mongoose";

const tipoHabitacionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    paqueteServicios: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'PaqueteServicios',
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('TipoHabitacion', tipoHabitacionSchema);