import mongoose from 'mongoose';

const PaqueteServiciosSchema = mongoose.Schema({
    nombrePservicio: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    nombreServicio: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Servicio",
        required: [true, "El servicio es obligatorio"]
    },
    img: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model('PaqueteServicio', PaqueteServiciosSchema)