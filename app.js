import express, { json } from 'express';
import cors from 'cors'
import morgan from 'morgan'
import fileUpload from 'express-fileupload';

import usuarioRouter from './router/usuariosRouter.js'
import adminRouter from './router/adminRouter.js';
import clienteRouter from './router/clienteRouter.js';
import productoRouter from './router/productoRouter.js';
import pedidoRouter from './router/pedidoRouter.js';
import {DB_MONGOATLAS,SESSION_SECRET} from './config.js';
import expressSession from 'express-session';
import MongoDBStore from 'connect-mongodb-session'
import handlebars from 'express-handlebars';
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app=express()


const MongoDBStoreSession = MongoDBStore(expressSession);

app.engine('.hbs',handlebars.engine({extname:'.hbs',defaultLayout:'main.hbs'}));
app.set('view engine','hbs');
app.set('views','./views');



app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:'*',
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp',
    safeFileNames: true, 
    preserveExtension: true 
}))

const store = new MongoDBStoreSession ({
    uri: DB_MONGOATLAS,
    collection: 'sessions2'
})
app.use(expressSession({
    name: 'session',
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
    store: store
}))
// Configura el middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));



app.use('/usuario',usuarioRouter)
app.use('/admin', adminRouter);
app.use('/cliente', clienteRouter);
app.use('/producto', productoRouter);
app.use('/pedido', pedidoRouter);
app.get('/*', (req, res) => {
    res.redirect('/usuario/login');
})
export default app





