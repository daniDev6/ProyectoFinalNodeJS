import { Productos } from '../models/productoModel.js'
import { updateProducto } from '../controllers/productoController.js'
/*
debe ingresar el numero de categoria
1-tortas
2-casamiento
3-babyshower
*/
export const getProducts=async (categoria)=>{
    return await Productos.find({categoria})
}





























