import Pedido from '../models/pedidoModel.js'
import {enviarPresupuesto} from '../utils/sendEmail.js'
export const getAllPedidos=async (req,res)=>{
    try{
        const pedidos=await Pedido.find().lean();
        res.render('listaPedidos',{pedidos});
    }catch(err){
        res.status(500).render('error',{error:"error al obtener lista de pedidos"});
    }
}



export const getPedidoById=async (req,res)=>{
    try{
        const {nombre}=req.query;
        const pedido=await Pedido.findById(req.params.id);
        if(!pedido){
            return res.status(404).render('error',{error:"pedidos no encontrado"});
        }
        res.status(200).json(pedido);
    }catch(err){
        res.status(500).render('error',{error:"error al obtener pedidos"});
    }
}

export const createPedido=async (req,res)=>{
    try{
        const nuevoPedido=await Pedido.create(req.body);
        await nuevoPedido.save();
        console.log(nuevoPedido,req.body)
        enviarPresupuesto(nuevoPedido)
        .then(() => {
            res.render('formularioExitoso')
        })
        .catch((error) => {
            res.status(500).render('errorAdmin',{error:"error al crear pedidos"});
        });
        
    }catch(err){
        res.status(500).render('error',{error:"error al crear pedidos"});
    }
}
export const createPedidoAdmin=async (req,res)=>{
    try{
        const nuevoPedido=await Pedido.create(req.body);
        await nuevoPedido.save();

        res.render('formularioExitosoAdmin')

    }catch(err){
        res.status(500).render('error',{error:"error al crear pedidos"});
    }
}



export const updatePedido=async (req,res)=>{
    try{
        const pedidoId=req.params.id;
        const pedidoActualizado=await Pedido.findByIdAndUpdate(
            pedidoId,
            req.body,
            {new:true}
            );
        if(!pedidoActualizado){
            return res.status(404).render('error',{error:"pedidos no encontrado"});
        }
        res.status(200).json(pedidoActualizado);
    }catch(err){
        res.status(500).render('error',{error:"error al actualizar pedidos"});
    }
}


export const deletePedido=async (req,res)=>{
    try{
        const pedidosId=req.params.id;
        const pedidosEliminado=await Pedido.findByIdAndDelete(pedidosId);
        if(!pedidosEliminado){
            return res.status(404).render('error',{error:"pedidos no encontrado"});
        }
        res.redirect('/pedido');
    }catch(err){
        res.status(500).render('error',{error:"error al eliminar pedidos"});
    }
}














