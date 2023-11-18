export const updateProducto = async (req, res) => {
    console.log('entre a update')
    console.log(req.files.image)
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
            if (productoNuevo.categoria == 1) {
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
            } else if (productoNuevo.categoria == 2) {
                console.log('esta entrando 6')
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
            } else if (productoNuevo.categoria == 3) {
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
            }else if (productoNuevo.categoria == 4) {
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
            await productoNuevo.save();
        } else {
            console.log('no se subio la imagen')
        }

        const producto=await Producto.findById(productoId).lean();
        console.log(productoActualizado)
        res.render('productoIdAdmin', {
            producto
        })
    }
    catch (err) {
        res.status(500).json({ error: "error al actualizar producto" });
    }
}