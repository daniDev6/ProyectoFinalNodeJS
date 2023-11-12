
import Cliente from '../models/clienteModel.js'
import Productos from '../models/productoModel.js'
export const getAllClientes=async (req,res)=>{
    try{
        const clientes=await Cliente.find();
        res.status(200).json(clientes);
    }catch(err){
        res.status(500).json({error:"error al obtener lista de clientes"});
    }
}

export const getClienteById=async (req,res)=>{
    const {email,password}=req.body;
    try{
        // const cliente=await Cliente.findById(req.params.id);
        const cliente=await Cliente.findOne({email:email});
        console.log("esto es cliente|: ",cliente.password,'password: ',password);
        if(!cliente ){
            return res.status(404).json({error:"cliente no encontrado"});
        }else if(cliente.password===password){
            res.status(201).json({msg:`Bienvenido ${cliente.nombre}`});
        }else{
            res.status(404).json({error:"contraseña incorrecta"});
        }
    }catch(err){
        res.status(500).json({error:"error al obtener cliente"});
    }
}


export const crearCliente=async (req,res)=>{
    try{
        const {emailRegistrar,passwordRegistrar,username}=req.body;
        const nuevoCliente=await Cliente.create({
            email:emailRegistrar,
            password:passwordRegistrar,
            nombre:username
        });
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    }catch(err){
        res.status(500).json({error:"error al crear cliente"});
    }
}

export const updateCliente=async (req,res)=>{

    try{
        const clienteId=req.params.id;
        // const cliente2=await Cliente.findOneAndUpdate({email:clienteId},req.body,{new:true});
        const clienteActualizado=await Cliente.findByIdAndUpdate(
            clienteId,
            req.body,
            {new:true}
            );
        if(!clienteActualizado){
            return res.status(404).json({error:"cliente no encontrado"});
        }
        res.status(200).json(clienteActualizado);
    }catch(err){
        res.status(500).json({error:"error al actualizar cliente"});
    }
}


export const deleteCliente=async (req,res)=>{
    try{
        const clienteId=req.params.id;
        const clienteEliminado=await Cliente.findByIdAndDelete(clienteId);
        if(!clienteEliminado){
            return res.status(404).json({error:"cliente no encontrado"});
        }
        res.status(200).json(clienteEliminado);
    }catch(err){
        res.status(500).json({error:"error al eliminar cliente"});
    }
}


export const goHome=async(req,res)=>{
    const productos=await Productos.find().lean()
    const tortas=await Productos.find({categoria:1}).lean()
    const casamiento=await Productos.find({categoria:2}).lean()
    const baby=await Productos.find({categoria:3}).lean()
    const home=await Productos.find({categoria:4}).lean()
    res.render('home',{
        productos,tortas,casamiento,baby,home
    })
}
export const goFormulario=(req,res)=>{
    res.render('formulario')
}
export const goGaleria=async(req,res)=>{
    const tortas=await Productos.find({categoria:1}).lean();    
    const casamiento=await Productos.find({categoria:2}).lean();    
    const baby=await Productos.find({categoria:3}).lean();    
    res.render('galeria',{
        tortas,casamiento,baby
    })
}
export const goNosotros=(req,res)=>{
    res.render('nosotros')
}