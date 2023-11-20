import {EMAILPASS,EMAILUSER} from '../config.js'
import nodemailer from 'nodemailer'
//password
//kpco kcat avtl hbbs

export const enviarEmail = async (usuario) => {
    //configuramos el trasportador del email
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAILUSER,
            pass: EMAILPASS
        }
    });
    //configuramos el email de respuesta al cliente que se registra
    let emailData = await transporter.sendMail({
        from: EMAILUSER,
        to: usuario.email,
        subject: 'Gracias por registrarse en nuestra App',
        html: `<h1>Bienvenido ${usuario.email} a nuestra Comunidad</h1> <br>
        A partir de este momento recibirás todas las novedades de nuestra comunidad <br>
        Saludos y muy buena jornada <br>
        <a href="https://www.educacionit.com/" target="_blank">Visitanos</a> para ver mas!! <br>`
    })
    let emailNew = await transporter.sendMail({
        from: EMAILUSER,
        to: EMAILUSER,
        subject: 'Se registro una nueva persona',
        html: `<h1>Se registro una nueva persona ${usuario.email} con el rol ${usuario.rol===1?'admin':'cliente'}</h1> <br>
        <p>comprobar en la base de datos <a href="https://proyectofinal-kbka.onrender.com/usuario/login"> ir a login</a></p>
        `
    })
};
export const enviarPresupuesto = async (formulario) => {
    //configuramos el trasportador del email
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAILUSER,
            pass: EMAILPASS
        }
    });
    //configuramos el email de respuesta al cliente que se registra
    let emailNew = await transporter.sendMail({
        from: EMAILUSER,
        to: EMAILUSER,
        subject: 'Se registro una nueva persona',
        html: `
        <h1>Se ingreso un pedido de ?${formulario.nombre}</h1>
        <p>email de contacto: ${formulario.email}</p>
        <p>telefono de contacto: ${formulario.email}</p>
        <p>categoria: ${formulario.categoria==1?'tortas':'pasteleria'}</p>
        <p>consulta puntual: ${formulario.consulta}</p>
        `
    })
};