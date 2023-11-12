import {Schema,model} from 'mongoose';

const ProductosSchema = new Schema({
    nombre: String,
    precio: String,
    descripcion: String,
    categoria: Number,
    imagen: {
        public_id: String,
        secure_url: String
    },
    stock: Boolean
}, { collection: 'productos',timestamps: true });

const Producto = model('producto', ProductosSchema);


export default Producto;