
import Admin from '../models/adminModel.js'
import Productos from '../models/productoModel.js'
import Usuario from '../models/usuariosModel.js';
export const getAllAdmins = async (req, res) => {
    try {
        const administradores = await Admin.find();
        return administradores
    } catch (err) {
        res.status(500).render('errorAdmin', { error: "error al obtener lista de administradores" });

    }
}

export const goListaUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({ rol: 2 }).lean();
        const admin = await Usuario.find({ rol: 1 }).lean();
        res.render('listaUsuarios', {
            usuarios,
            admin
        })
    } catch (err) {
        res.status(500).render('errorAdmin', { error: "error al obtener lista de usuarios" });
    }

}
export const getAdminById = async (req, res) => {
    try {
        const administrador = await Admin.findById(req.params.id);
        if (!administrador) {
            return res.status(404).render('errorAdmin', { error: "administrador no encontrado" });
        }
        res.status(200).json(administrador);
    } catch (err) {
        res.status(500).render('errorAdmin', { error: "error al obtener administrador" });
    }
}
export const updateAdmin = async (req, res) => {
    console.log('entre a actualizando admin')
    try {
        const administradorId = req.params.id;
        const administradorActualizado = await Admin.findByIdAndUpdate(
            administradorId,
            req.body,
            { new: true }
        );
        if (!administradorActualizado) {
            return res.status(404).render('errorAdmin', { error: "administrador no encontrado" });
        }
        res.status(200).json(administradorActualizado);
    } catch (err) {
        res.status(500).render('errorAdmin', { error: "error al actualizar administrador" });
    }
}

export const deleteAdmin = async (req, res) => {
    try {
        const administradorId = req.params.id;
        const administradorEliminado = await Admin.findByIdAndDelete(administradorId);
        if (!administradorEliminado) {
            return res.status(404).render('errorAdmin', { error: "administrador no encontrado" });
        }
        res.status(200).json(administradorEliminado);
    } catch (err) {
        res.status(500).render('errorAdmin', { error: "error al eliminar administrador" });
    }
}
export const createAdmin = async (req, res) => {
    try {
        const nuevoAdministrador = await Admin.create(req.body);
        await nuevoAdministrador.save();
        res.status(201).json(nuevoAdministrador);
    } catch (err) {
        res.status(500).render('errorAdmin', { error: "error al crear administrador" });
    }
}
export const goHome = async (req, res) => {
    const productos = await Productos.find().lean()
    const tortas = await Productos.find({ categoria: 1 }).lean()
    const casamiento = await Productos.find({ categoria: 2 }).lean()
    const baby = await Productos.find({ categoria: 3 }).lean()
    const home = await Productos.find({ categoria: 4 }).lean()
    res.render('homeAdmin', {
        productos, tortas, casamiento, baby, home
    })
}
export const goHomeEdit = async (req, res) => {
    const producto = await Productos.findById(req.params.id).lean();
    if (!producto) {
        return res.status(404).render('errorAdmin', { error: "producto no encontrado" });
    }
    res.render('homeEdit', {
        producto
    })
}
export const goFormulario = async (req, res) => {
    try {
        res.render('formularioAdmin')
    } catch (error) {
        res.status(404).render('errorAdmin', { error: "producto no encontrado" });
    }
}
export const goGaleria = async (req, res) => {
    const tortas = await Productos.find({ categoria: 1 }).lean();
    const casamiento = await Productos.find({ categoria: 2 }).lean();
    const baby = await Productos.find({ categoria: 3 }).lean();
    const productos = await Productos.find().lean()
    res.render('galeriaAdmin', {
        tortas, casamiento, baby
    })
}
export const goNosotros = (req, res) => {
    res.render('nosotrosAdmin')
}
export const goCrearProducto = (req, res) => {
    res.render('crearProducto')
}