import {Schema,model} from 'mongoose';

const ClientesSchema = new Schema({
    nombre: String,
    email: String,
    password: String,
    rol: String
}, { collection: 'clientes',timestamps: true  });

const Cliente = model('cliente', ClientesSchema);

export default Cliente;