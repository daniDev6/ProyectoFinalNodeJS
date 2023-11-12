const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const mongoose=require('mongoose');
const app = express();  
const port=3006;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//app.use(express.cors());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})



dotenv.config();
//mongodb librería por defecto de la base de datos de Mongo
// npm i mongodb
const MongoClient = require('mongodb').MongoClient;

//url: es la ruto de la conexión a la base de datos
const MONGO_URL_LOCAL = process.env.MONGO_LOCAL;

console.log(MONGO_URL_LOCAL);

//Mongo Atlas
const MONGO_URL_ATLAS = process.env.MONGO_LOCAL;
console.log(MONGO_URL_ATLAS);

// app.post('/registrar', (req, res) => {
//     let { username, emailRegistrar, passwordRegistrar } = req.body;
//     if(!username || !emailRegistrar || !passwordRegistrar){
//         return res.status(400).send('Faltan datos');
//     }
//     MongoClient.connect(MONGO_URL_ATLAS, async (err, db) => {
//         if(err) throw err;
//         try {
//             let dbo = db.db('tortadb')
//             let coleccion=dbo.collection('administradores');
//             // Buscar el usuario por su nombre de usuario
//             const usuario = await coleccion.findOne({ email:emailRegistrar });

//             // Verificar si el usuario existe
//             if (usuario) {
//                 // Envia como respuesta que el usuario ya existe
//                 res.status(404).send('Usuario ya existe');
//             } else {
//                 let documento={
//                     username:username,
//                     email:emailRegistrar,
//                     password:passwordRegistrar
//                 }
//                 console.log(documentoEmpleado);
//                     await dbo.collection('administradores').insertOne(documentoEmpleado, (err, res) => {
//                         if(err) throw err;
//                         console.log(`Documento insertado en la colección empleados`);
//                         db.close();
//                     });              
//                     res.send('Usuario registrado');
//             }
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('Error al buscar el usuario');
//         }
//     })
// })






// app.post('/login', (req, res) => {
//     let { email, password } = req.body;
//     let newUser={
//         email:email,
//         password:password
//     }
//     console.log(newUser);
//     MongoClient.connect(MONGO_URL_ATLAS, async (err, db) => {
//         if(err) throw err;
//         let dbo = db.db('tortadb')
//         let coleccion=dbo.collection('administradores');
//         try {
//             // Buscar el usuario por su nombre de usuario
//             const usuario = await coleccion.findOne({ email:email});

//             console.log('esto es usuario|: ',usuario.password);
//             // Verificar si el usuario existe
//             if (usuario) {
//                 // Enviar el usuario como respuesta
//                 if(usuario.password==password){
//                     res.json(`bienvenido ${usuario.username}`);
//                 }else{

//                     res.json({message:'contraseña incorrecta'})
//                 }
//             } else {
//                 res.status(404).send('Usuario no encontrado');
//             }
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('Error al buscar el usuario');
//         }
//MONGO_ATLAS
//     })
//     // res.send(newUser);
// })




mongoose.connect(MONGO_URL_ATLAS , {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    });

const adminRouter = require('./router/adminRouter');
const clienteRouter = require('./router/clienteRouter');
const productoRouter = require('./router/productoRouter');
const pedidoRouter = require('./router/pedidoRouter');

app.use('/admin', adminRouter);
app.use('/cliente', clienteRouter);
app.use('/producto', productoRouter);
app.use('/pedido', pedidoRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})













