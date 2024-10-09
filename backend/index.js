import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import db from './config/db.js';
import clientesRoutes from './routes/clientesRoutes.js';
import productosRoutes from './routes/productosRoutes.js'
import apiRoutes from './routes/apiRoutes.js'
import facturasRoutes from './routes/facturasRoutes.js'

//Se crea la app de express
const app = express();

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

// Configurar morgan para registrar las solicitudes en la consola
app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],// Permite solicitudes desde tu frontend
}));

// Habilitar JSON para el cuerpo de las solicitudes
app.use(express.json());

// Habilitar cookie parser
app.use(cookieParser());

//Routing de datos de cliente
app.use('/clientes', clientesRoutes);
//Routing de datos de producto
app.use('/productos', productosRoutes);
//Routing de datos de api
app.use('/api', apiRoutes);
//Routing de datos de facturas
app.use('/facturas', facturasRoutes);

// Conexion a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.log('Conexion correcta a la base de datos');
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
}

//Se declara cual es la carpeta publica
app.use(express.static('public'));

// Creación del servidor en el puerto 3001
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});
