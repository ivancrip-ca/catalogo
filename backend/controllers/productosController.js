import Productos from '../models/productos.js'


//Clase que llena los datos en la tabla de producto que se reciben en el front
export const llenarProducto = async (req, res) => {
  try {
      console.log('Datos recibidos en el servidor:', req.body); // Depuración de datos recibidos


      const { Pro_Nombre, Pro_Descripcion, Pro_Precio } = req.body;

      //En caso de que no se reciba algun dato manda un mensaje
      if (!Pro_Nombre || !Pro_Descripcion || !Pro_Precio) {
          return res.status(400).json({ message: 'Los datos son requeridos' });
      }

      //Crea el producto
      const nuevoProducto = await Productos.create({ Pro_Nombre, Pro_Descripcion, Pro_Precio });

      //Regresa un status 201, la creación fue correcta
      res.status(201).json(nuevoProducto);
  } catch (error) {
      console.error('Error al registrar producto:', error);
      res.status(500).json({ message: 'Error al registrar el producto.' });
  }
};
