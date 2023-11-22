import Usuario from '../models/usuariosModel.js'
import bcrypt from 'bcrypt'
import _ from 'lodash';
import { dbSecretFields, EMAILPASS, EMAILUSER } from '../config.js'
import { enviarEmail } from '../utils/sendEmail.js'
import nodemailer from 'nodemailer'

export const login = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body
        const usuarios = await Usuario.find()
        const usuario = await Usuario.findOne({ email: email })
        if (!usuario) {
            res.render('loginLayout', { layout: null, error: 'email no registrado' })
        }
        const isCorretcPassword = await bcrypt.compare(password, usuario.password)
        if (!isCorretcPassword) {
            return res.status(400).render('loginLayout', { layout: null, error: 'password is incorrect' })
        }
        req.session.rol = usuario.rol
        req.session.email = usuario.email
        req.session.userId = usuario._id
        req.session.save()
        if (usuario.rol == 1) {
            res.redirect('/admin/home')
        } else {
            res.redirect('/cliente/home')
        }
    } catch (error) {
        res.status(400).render('loginLayout', { layout: null, error: 'password is incorrect' })
    }
}

export const logout = async (req, res) => {
    try {

        req.session.destroy((err) => {
            if (err) {
                res.status(500).render('loginLayout', { layout: null, error: 'password is incorrect' })
            } else {
                res.render('loginLayout', { layout: null, error: 'password is incorrect' })
            }
        });
    }
    catch (err) {
        res.status(500).render('loginLayout', { layout: null, error: 'error en cerrar sesion' })
    }


}

export const register = async (req, res) => {
    try {
        console.log(req.body, 'entrando a register')
        const usuarios=await Usuario.find({email:req.body.email})
        if(usuarios.length>0){
            return res.status(400).render('loginLayout', { layout: null, error: 'email ya registrado' })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12)
        const user = await Usuario.create({ ...req.body, password: hashedPassword })
        enviarEmail(user)
            .then(() => {
            }).catch((error) => {
                console.log(error)
            });
        // req.session.userId=user._id
        // return res.status(201).json({ message: 'user created', user: _.omit(user.toObject(), dbSecretFields) })
        if (user.rol == 1) {
            res.redirect('/admin/home')
        } else {
            res.redirect('/cliente/home')
        }
    } catch (error) {
        res.status(500).render('loginLayout', { layout: null, error: 'error en crear usuario' })
    }
}







export const eliminar=async(req,res)=>{
    try {
        const user=await Usuario.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).render('errorAdmin',{error:"usuario no encontrado"})
        }
        res.redirect('/admin/lista/usuarios')
    } catch (error) {
        res.status(500).render('errorAdmin',{error:"usuario no encontrado"})
    }
}

export const goRegister=async(req,res)=>{
    res.render('registrar', { layout: null })
}
















