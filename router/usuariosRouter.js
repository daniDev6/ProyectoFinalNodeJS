import { Router } from "express";
import {login,register,logout} from '../controllers/usuariosController.js'  
const router=Router();

router.post('/login',login)
router.post('/register',register)
router.post('/logout',logout)
router.get('/login',(req,res)=>{
    res.render('loginLayout', { layout: null })
})



export default router




