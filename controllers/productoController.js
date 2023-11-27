import Producto from '../models/productoModel.js'
import fs from 'fs-extra'
import { uploadCasamientoPhoto, uploadCumplePhoto, uploadBabyPhoto,uploadHomePhoto, deleteCasamientoPhoto, deletePhoto } from '../utils/cloudinary.js'
/*
1-tortas
2-cumpleanios
3-babyshower
4-home

4-decoraciones
5-fiestas
6-fiestas infantiles

*/

const analizarCategoria=async(producto)=>{
    if (producto.categoria == 1) {
        return  await uploadCasamientoPhoto(req.files.image.tempFilePath);
    } else if (producto.categoria == 2) {
        return  await uploadCumplePhoto(req.files.image.tempFilePath);
    } else if (producto.categoria == 3) {
        return  await uploadBabyPhoto(req.files.image.tempFilePath);
    }else if (producto.categoria == 4) {
        return  await uploadHomePhoto(req.files.image.tempFilePath);
} else{
    res.render('error',{
        error: 'no se subio la imagen'
    })
}
}
export const getAllProductos = async (req, res) => {
    try {
        if (req.files?.image) {
            await fs.unlink(req.files.image.tempFilePath);
        }
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (err) {
        res.status(500).error('errorAdmin',{ error: "error al obtener lista de productos" });
    }
}


export const getProductoById = async (req, res) => {
    try {
        if (req.files?.image) {
            await fs.unlink(req.files.image.tempFilePath);
        }
        const producto = await Producto.findById(req.params.id).lean();
        if (!producto) {
            return res.status(404).render('errorAdmin',{ error: "producto no encontrado" });
        }
        res.render('productoId',{
            producto
        })
    } catch (err) {
        res.status(500).render('errorAdmin',{ error: "error al obtener producto" });
    }
}


export const createProducto = async (req, res) => {
    try {
        const product = await Producto.findOne({ nombre: req.body.nombre, categoria: req.body.categoria });
        if (product) {
            /*if (req.files?.image) {
                await fs.unlink(req.files.image.tempFilePath);
            }*/
            return res.render("errorAdmin", { error: "producto ya registrado"})
        }
        const productoNuevo = new Producto(req.body);
        console.log(req.files.image)
        if (req.files?.image) {
           /* const tempFilePath = req.files.image.tempFilePath
            const originalName = req.files.image.name
            const fileExtencion = originalName.split('.').pop()*/
            const productImg = await analizarCategoria(req.body);
            productoNuevo.imagen = {
                public_id: productImg.public_id,
                secure_url: productImg.secure_url
            }
           /* const newTempFilePath = `${req.files.image.tempFilePath}.${fileExtencion}`
            await fs.rename(tempFilePath, newTempFilePath, (err) => {
                if (err) {
                    console.log(err)
                }
            })*/
            /*await fs.unlink(req.files.image.tempFilePath);*/
        } else {
            res.render('errorAdmin', {
                error: 'no se subio la imagen'
            })
        }

        await productoNuevo.save();
        const producto=await Producto.findById(productoNuevo._id).lean();
        res.render('productoIdAdmin', {
            producto
        })
    } catch (err) {
        res.render('errorAdmin', {
            error: 'error al crear producto'
        })
    }
}
export const createProductos = async (req, res) => {
    try {
        const product = await Producto.findOne({ nombre: req.body.nombre, categoria: req.body.categoria });
        if (product) {
            if (req.files?.image) {
                await fs.unlink(req.files.image.tempFilePath);
            }
            return res.render("errorAdmin", { error: "producto ya registrado"})
        }
        const productoNuevo = Producto.insertMany(req.body);
        if (req.files?.image) {
            const tempFilePath = req.files.image.tempFilePath
            const originalName = req.files.image.name
            const fileExtencion = originalName.split('.').pop()
            let productImg=analizarCategoria(req.body)
        productoNuevo.imagen = {
            public_id: productImg.public_id,
            secure_url: productImg.secure_url
        }
        const newTempFilePath = `${req.files.image.tempFilePath}.${fileExtencion}`
        await fs.rename(tempFilePath, newTempFilePath, (err) => {
            if (err) {
                res.render('error', {
                    error: 'no se subio la imagen'
                })
            }
        })
        await fs.unlink(req.files.image.tempFilePath);
        await productoNuevo.save();
        const producto=await Producto.findById(productoNuevo._id).lean();
        res.render('productoIdAdmin', {
            productoNuevo
        })
    }
    } catch (err) {
        res.render('error',{
            error: 'no se creo el producto'
        })
    }
}
















export const deleteProducto = async (req, res) => {
    try {
        const productoId = req.params.id;
        const producto=await Producto.findById(productoId).lean();
        if (req.files?.image) {
            await fs.unlink(req.files.image.tempFilePath);
        }
        if(producto.imagen?.secure_url){
            await deletePhoto(producto.imagen.public_id);
        }
        const productoEliminado = await Producto.findByIdAndDelete(productoId);
        
        if (!productoEliminado) {
            return res.status(404).json({ error: "producto no encontrado" });
        }
        res.status(200).rendirect('/admin/galeria');
    } catch (err) {
        res.status(500).render('errorAdmin',{ error: "error al eliminar producto" });
    }
}
export const viewUpdateProduct=async (req,res)=>{
    try{
        const producto=await Producto.findById(req.params.id).lean();
        if(!producto){
            return res.status(404).json({error:"producto no encontrado"});
        }
        res.render('actualizandoProducto',{
            producto
        })
    }catch(err){
        res.status(500).render('errorAdmin',{error:"error al obtener producto"});
    }
}


export const updateProducto = async (req, res) => {
    try {
        const productoId = req.params.id;
        const productoActualizado = await Producto.findById(productoId, req.body);
        if (!productoActualizado) {
            return res.status(404).json({ error: "producto no encontrado" });
        }
        const productoNuevo = await Producto.findByIdAndUpdate(productoId, req.body, { new: true });
        if (req.files?.image) {
            if(productoNuevo.imagen.public_id){
                console.log(productoNuevo.imagen.public_id)

                await deletePhoto(productoNuevo.imagen.public_id);
            }
            const tempFilePath = req.files.image.tempFilePath
            const originalName = req.files.image.name
            const fileExtencion = originalName.split('.').pop()
            let productImg=analizarCategoria(productoNuevo)
            productoNuevo.imagen = {
                public_id: productImg.public_id,
                secure_url: productImg.secure_url
            }
            const newTempFilePath = `${req.files.image.tempFilePath}.${fileExtencion}`
            await fs.rename(tempFilePath, newTempFilePath, (err) => {
                if (err) {
                    res.render('error',{
                        error:err
                    })
                }
            })
            await fs.unlink(req.files.image.tempFilePath);
            await productoNuevo.save();
        } 

        const producto=await Producto.findById(productoId).lean();
        res.render('productoIdAdmin', {
            producto
        })
    }
    catch (err) {
        res.status(500).render('errorAdmin',{error: "error al actualizar producto" });
    }
}


export const viewUpdateHomeProduct=async(req,res)=>{
    const producto=await Producto.findById(req.params.id).lean();
    if(!producto){
        return res.status(404).render('errorAdmin',{error:"producto no encontrado"});
    }
    res.render('homeEdit',{
        producto
    })
}






