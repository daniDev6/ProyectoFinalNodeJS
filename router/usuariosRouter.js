import { Router } from "express";

import {login,register,goRegister,logout,eliminar} from '../controllers/usuariosController.js'  
const router=Router();

router.post('/login',login)
router.post('/register',register)
router.get('/register',goRegister)
router.post('/delete/:id',eliminar)
router.post('/logout',logout)
router.get('/login',(req,res)=>{
    res.render('loginLayout', { layout: null })
})



export default router




