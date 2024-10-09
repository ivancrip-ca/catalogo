import express from 'express';
import { llenarFactura } from '../controllers/facturasController.js';


//se define el router para las rutas de las facturas
const router = express.Router();

//Ruta deonde se hace la insecion de datos en la tabla de facturas
router.post('/registro', llenarFactura);


export default router;
