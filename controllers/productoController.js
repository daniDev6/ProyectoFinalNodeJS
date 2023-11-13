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
export const getAllProductos = async (req, res) => {
    try {
        if (req.files?.image) {
            await fs.unlink(req.files.image.tempFilePath);
        }
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (err) {
        res.status(500).json({ error: "error al obtener lista de productos" });
    }
}


export const getProductoById = async (req, res) => {
    try {
        if (req.files?.image) {
            await fs.unlink(req.files.image.tempFilePath);
        }
        const producto = await Producto.findById(req.params.id).lean();
        if (!producto) {
            return res.status(404).json({ error: "producto no encontrado" });
        }
        console.log(producto)
        res.render('productoId',{
            producto
        })
    } catch (err) {
        res.status(500).json({ error: "error al obtener producto" });
    }
}


export const createProducto = async (req, res) => {
    try {
        const product = await Producto.findOne({ nombre: req.body.nombre, categoria: req.body.categoria });
        if (product) {
            if (req.files?.image) {
                await fs.unlink(req.files.image.tempFilePath);
            }
            return res.send("producto ya registrado")
        }
        const productoNuevo = new Producto(req.body);
        console.log(req.files.image)
        if (req.files?.image) {
            console.log('entro')
            const tempFilePath = req.files.image.tempFilePath
            const originalName = req.files.image.name
            const fileExtencion = originalName.split('.').pop()
            if (req.body.categoria == 1) {
                const productImg = await uploadCumplePhoto(req.files.image.tempFilePath);
                productoNuevo.imagen = {
                    public_id: productImg.public_id,
                    secure_url: productImg.secure_url
                }
                const newTempFilePath = `${req.files.image.tempFilePath}.${fileExtencion}`
                await fs.rename(tempFilePath, newTempFilePath, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
                await fs.unlink(req.files.image.tempFilePath);
                console.log(req.files.image.tempFilePath)
                console.log('se subio la imagen')
            } else if (req.body.categoria == 2) {
                const productImg = await uploadCasamientoPhoto(req.files.image.tempFilePath);
                productoNuevo.imagen = {
                    public_id: productImg.public_id,
                    secure_url: productImg.secure_url
                }
                const newTempFilePath = `${req.files.image.tempFilePath}.${fileExtencion}`
                await fs.rename(tempFilePath, newTempFilePath, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
                await fs.unlink(req.files.image.tempFilePath);
                console.log(req.files.image.tempFilePath)
                console.log('se subio la imagen')
            } else if (req.body.categoria == 3) {
                const productImg = await uploadBabyPhoto(req.files.image.tempFilePath);
                productoNuevo.imagen = {
                    public_id: productImg.public_id,
                    secure_url: productImg.secure_url
                }
                const newTempFilePath = `${req.files.image.tempFilePath}.${fileExtencion}`
                await fs.rename(tempFilePath, newTempFilePath, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
                await fs.unlink(req.files.image.tempFilePath);
                console.log(req.files.image.tempFilePath)
                console.log('se subio la imagen')

        }else if (req.body.categoria == 4) {
                const productImg = await uploadHomePhoto(req.files.image.tempFilePath);
                productoNuevo.imagen = {
                    public_id: productImg.public_id,
                    secure_url: productImg.secure_url
                }
                const newTempFilePath = `${req.files.image.tempFilePath}.${fileExtencion}`
                await fs.rename(tempFilePath, newTempFilePath, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
                await fs.unlink(req.files.image.tempFilePath);
                console.log(req.files.image.tempFilePath)
                console.log('se subio la imagen')
            }

        } else {
            console.log('no se subio la imagen')
        }

        await productoNuevo.save();
        const producto=await Producto.findById(productoNuevo._id).lean();
        res.render('productoId', {
            producto
        })
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}
export const createProductos = async (req, res) => {
    try {
        const product = await Producto.findOne({ nombre: req.body.nombre, categoria: req.body.categoria });
        if (product) {
            if (req.files?.image) {
                await fs.unlink(req.files.image.tempFilePath);
            }
            return res.send("producto ya registrado")
        }
        const productoNuevo = Producto.insertMany(req.body);
        if (req.files?.image) {
            const tempFilePath = req.files.image.tempFilePath
            const originalName = req.files.image.name
            const fileExtencion = originalName.split('.').pop()
            let productImg
            if (req.body.categoria == 1) {
                productImg = await uploadCasamientoPhoto(req.files.image.tempFilePath);

            } else if (req.body.categoria == 2) {
                productImg = await uploadCumplePhoto(req.files.image.tempFilePath);


            } else if (req.body.categoria == 3) {
                productImg = await uploadBabyPhoto(req.files.image.tempFilePath);

            }else if (req.body.categoria == 4) {
            productImg = await uploadHomePhoto(req.files.image.tempFilePath);
        } else{
            res.render('error',{
                error: 'no se subio la imagen'
            })
        }
        productoNuevo.imagen = {
            public_id: productImg.public_id,
            secure_url: productImg.secure_url
        }
        const newTempFilePath = `${req.files.image.tempFilePath}.${fileExtencion}`
        await fs.rename(tempFilePath, newTempFilePath, (err) => {
            if (err) {
                console.log(err)
            }
        })
        await fs.unlink(req.files.image.tempFilePath);
        console.log(req.files.image.tempFilePath)
        console.log('se subio la imagen')
        await productoNuevo.save();
        res.status(201).json(productoNuevo);
    }
    } catch (err) {
        console.log(err)
        res.send(err)
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
        res.status(200).json(productoEliminado);
    } catch (err) {
        res.status(500).json({ error: "error al eliminar producto" });
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
        res.status(500).json({error:"error al obtener producto"});
    }
}


export const updateProducto = async (req, res) => {
    console.log('entre a update')
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
            let productImg 
            if (productoNuevo.categoria == 1) {
                productImg = await uploadCasamientoPhoto(req.files.image.tempFilePath);

            } else if (productoNuevo.categoria == 2) {
                productImg = await uploadCumplePhoto(req.files.image.tempFilePath);

            } else if (productoNuevo.categoria == 3) {
                productImg = await uploadBabyPhoto(req.files.image.tempFilePath);
            }else if (productoNuevo.categoria == 4) {
                productImg = await uploadHomePhoto(req.files.image.tempFilePath);
            }else {
                res.render('erros',{
                    error:"no se subio la imagen"
                })
            }
            productoNuevo.imagen = {
                public_id: productImg.public_id,
                secure_url: productImg.secure_url
            }
            const newTempFilePath = `${req.files.image.tempFilePath}.${fileExtencion}`
            await fs.rename(tempFilePath, newTempFilePath, (err) => {
                if (err) {
                    res.render('erros',{
                        error:err
                    })
                }
            })
            await fs.unlink(req.files.image.tempFilePath);
            await productoNuevo.save();
        } 

        const producto=await Producto.findById(productoId).lean();
        console.log(productoActualizado)
        res.render('productoIdAdmin', {
            producto
        })
    }
    catch (err) {
        res.status(500).render('erros',{error: "error al actualizar producto" });
    }
}


export const viewUpdateHomeProduct=async(req,res)=>{
    const producto=await Producto.findById(req.params.id).lean();
    if(!producto){
        return res.status(404).render('erros',{error:"producto no encontrado"});
    }
    console.log(producto)
    res.render('homeEdit',{
        producto
    })
}






