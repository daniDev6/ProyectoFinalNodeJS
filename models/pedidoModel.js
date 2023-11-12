import {Schema,model} from 'mongoose';

const PedidosSchema = new Schema({
    nombre: String,
    email: String,
    telefono: Number,
    consulta: String,
    categoria: String

}, { collection: 'pedidos',timestamps: true  });

const Pedido = model('pedido', PedidosSchema);

export default Pedido;