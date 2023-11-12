
import {Router} from 'express'
import {goCrearProducto,getAllAdmins,getAdminById,createAdmin,updateAdmin,deleteAdmin,goFormulario,goGaleria,goHome,goNosotros,goHomeEdit} from '../controllers/adminController.js'
const router = Router();
import { loginRequired } from '../auth/authController.js';
// const {requiredScopes}=require('express-oauth2-jwt-bearer')





//ruta para traer todos los adminitradores
router.get('/traer',loginRequired,getAllAdmins);
//ruta para traer Admin por id
router.get('/traer/:id',loginRequired,getAdminById);
//ruta para crear Admin
router.post('/crear',loginRequired,createAdmin);
//ruta para actualizar adminitrador
router.put('/update/:id',loginRequired,updateAdmin);
//ruta para eliminar adminitrador
router.delete('/borrar/:id',loginRequired,deleteAdmin);



router.get('/home',loginRequired,goHome);
router.get('/home/edit/:id',loginRequired,goHomeEdit);
router.get('/formulario',loginRequired,goFormulario);
router.get('/galeria',loginRequired,goGaleria);
router.get('/nosotros',loginRequired,goNosotros);
router.get('/crear/producto',loginRequired,goCrearProducto);



export default router;







































