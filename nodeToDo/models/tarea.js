import mongoose, { Schema } from 'mongoose';

const tareaSchema = new Schema({
    usuario: { type: Schema.ObjectId, ref: 'usuarios' },
    nombre: { type: String, maxlength: 50, required: true },
    realizada: { type: Boolean, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const Tarea = mongoose.model('tarea', tareaSchema);

export default Tarea;