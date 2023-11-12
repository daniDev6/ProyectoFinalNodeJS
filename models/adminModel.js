import {Schema,model} from 'mongoose';

const AdminSchema = new Schema({
    nombre: String,
    email: String,
    password: String,
    rol: String
}, { collection: 'administradores',timestamps: true  });

const Admin = model('administradore', AdminSchema);

export default Admin;


