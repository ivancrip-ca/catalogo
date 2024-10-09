import express from 'express';
import { llenarCliente } from '../controllers/clientesController.js';

//se define el router para las rutas de los clientes
const router = express.Router();

//Ruta deonde se hace la insecion de datos en la tabla de clientes
router.post('/registro', llenarCliente);


export default router;
