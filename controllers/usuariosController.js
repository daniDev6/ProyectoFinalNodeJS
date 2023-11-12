import Usuario from '../models/usuariosModel.js'
import bcrypt from 'bcrypt'
import _ from 'lodash';
import { dbSecretFields } from '../config.js'
export const login = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body
        const usuarios=await Usuario.find()
        console.log(usuarios)
        const usuario = await Usuario.findOne({ email: email })
        console.log('esto es usuario|: ', usuario)
        if (!usuario) {
            res.send('usuario no encontrado')
        }
        
        const isCorretcPassword = bcrypt.compare(password, usuario.password)

        if (!isCorretcPassword) {
            return res.status(400).json({ message: 'password is incorrect' })
        }
        req.session.rol = usuario.rol
        req.session.email = usuario.email
        req.session.userId = usuario._id
        req.session.save()
        console.log('guardando sesion', req.session)
        if (usuario.rol == 1) {
            console.log('es admin')
            res.redirect('/admin/home')
        } else {
            console.log('no es admin')
            res.redirect('/cliente/home')
        }
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al destruir la sesión:', err);
            res.status(500).send('Error al cerrar sesión');
        } else {
            console.log('Sesión destruida');
            res.send('logout');
        }
    });


}

export const register = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    const user = await Usuario.create({ ...req.body, password: hashedPassword })
    // req.session.userId=user._id
    return res.status(201).json({ message: 'user created', user: _.omit(user.toObject(), dbSecretFields) })
}


























