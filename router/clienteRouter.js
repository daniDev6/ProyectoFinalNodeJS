import {Router} from 'express'
import {getAllClientes,getClienteById,crearCliente,updateCliente,deleteCliente,goHome,goFormulario,goGaleria,goNosotros} from '../controllers/clienteController.js'
const router=Router();
import { loginRequired } from '../auth/authController.js';



//ruta traer todos los clientes
router.get('/traer',loginRequired,getAllClientes);
//ruta para traer cliente por id
router.post('/traer/email',loginRequired,getClienteById);
//ruta para crear cliente
router.post('/crear',loginRequired,crearCliente);
//ruta para actualizar cliente
router.put('/update/:id',loginRequired,updateCliente);
//ruta para eliminar Cliente
router.delete('/borrar/:id',loginRequired,deleteCliente);


router.get('/home',goHome);
router.get('/formulario',goFormulario);
router.get('/galeria',goGaleria);
router.get('/nosotros',goNosotros);

export default router;










