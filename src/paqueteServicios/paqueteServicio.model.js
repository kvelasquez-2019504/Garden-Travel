import mongoose from 'mongoose';

const PaqueteServiciosSchema = mongoose.Schema({

    nombreServicio: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Servicio",
        required: [true, "El servicio es obligatorio"]
    },
    state: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model('PaqueteServicio', PaqueteServiciosSchema)