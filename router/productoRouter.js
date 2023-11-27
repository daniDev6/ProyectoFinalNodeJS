import { Router } from 'express';
const route = Router();
import {getAllProductos,getProductoById,createProducto,viewUpdateHomeProduct,updateProducto,deleteProducto,viewUpdateProduct,createProductos} from '../controllers/productoController.js';
import { loginRequired } from '../auth/authController.js';

//ruta traer todos productos
route.get('/',getAllProductos);
//ruta para traer producto por id
route.get('/:id',getProductoById);
//ruta para crear producto
route.post('/',createProducto);
//ruta para crear producto
route.post('/all',loginRequired,createProductos);
//ruta para actualizar producto
route.post('/update/:id',loginRequired,updateProducto);
route.get('/update/:id',loginRequired,viewUpdateProduct);
route.get('/update/home/:id',loginRequired,viewUpdateHomeProduct);
//ruta para eliminar producto
route.post('/delete/:id',loginRequired,deleteProducto);









export default route;


