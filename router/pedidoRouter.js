import {Router} from 'express'
const route = Router();

import { getAllPedidos,createPedidoAdmin,getPedidoById,createPedido,updatePedido,deletePedido } from '../controllers/pedidoController.js';
import { loginRequired } from '../auth/authController.js';

// const {requiredScopes}=require('express-oauth2-jwt-bearer')





//ruta para traer todos los pedidos
route.get('/',loginRequired,getAllPedidos);

//ruta para traer pedidos por id
route.get('/:id',loginRequired,getPedidoById);

//ruta para crear pedidos
route.post('/',createPedido);
route.post('/admin',createPedidoAdmin);
//ruta para actualizar pedido
route.put('/:id',loginRequired,updatePedido);
//ruta para eliminar pedido
route.delete('/:id',loginRequired,deletePedido);





export default route;

