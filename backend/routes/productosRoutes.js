import express from 'express';
import { llenarProducto } from '../controllers/productosController.js';

//se define el router para las rutas de los productos
const router = express.Router();

//Ruta deonde se hace la insecion de datos en la tabla de productos
router.post('/registro', llenarProducto);


export default router;
