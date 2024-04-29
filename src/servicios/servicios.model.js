import mongoose from 'mongoose';

const ServiciosSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    precio: {
        type: Number,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model('Servicio', ServiciosSchema)