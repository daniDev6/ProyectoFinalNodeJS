import {Schema,model} from 'mongoose';

const UsuariosSchema = new Schema({
    nombre: String,
    email: String,
    password: String,
    rol: Number
}, { collection: 'usuarios',timestamps: true  });

const Usuario = model('usuarios', UsuariosSchema);

export default Usuario;


