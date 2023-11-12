// import bcrypt from 'bcrypt';
// import _ from 'lodash';

// import Admin from '../models/adminModel.js'
// import Cliente from '../models/clienteModel.js'
// import {dbSecretFields} from '../config.js'

import Usuario from "../models/usuariosModel.js"
export const loginRequired=async(req,res,next)=>{
    console.log('entrando')
    if(!req.session||!req.session.userId){
        console.log('no hay usuario logueado')
        return res.redirect('/')
    }
    console.log('algo anda mal')
    req.user=await Usuario.findById(req.session.userId)
    if(!req.user){
        console.log('no hay usuario')
        return res.redirect('/login')
    }
    if(req.user.rol==1){
        console.log('es admin saliendo')

        next()
    } else{
        console.log('es admin saliendo')
        return res.redirect('/login')
    }

}
/*
1-admin
2-cliente
3-usuario


*/
















