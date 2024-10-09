import express from 'express'
import Clientes from '../models/clientes.js';
import Productos from '../models/productos.js';
const router = express.Router();


// Obtener todos los clientes
router.get('/clientes', async (req, res) => {
    try {
        //Se llaman todos los registros de la tabla clientes
        const clientes = await Clientes.findAll();
        res.json(clientes); //Se devuelven los datos como json
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ message: 'Error al obtener clientes' });
    }
});


// Obtener todos los productos
router.get('/productos', async (req, res) => {
    try {
        //Se llaman todos los registros de la tabla prodductos
        const productos = await Productos.findAll();
        //Se mapean los datos para que en el front sea mas facil extraerlos
        const productosSimplificados = productos.map(producto => producto.dataValues);
        //Imprimee los productos encontrados en la tabla
        console.log('Productos obtenidos desde la base de datos:', productosSimplificados); // Depuración
        res.json(productosSimplificados);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});



export default router
