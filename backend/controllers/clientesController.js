import Clientes from '../models/clientes.js'


//Clase que llena los datos en la tabla de cliente que se reciben en el front
export const llenarCliente = async (req, res) => {
  try {
      console.log('Datos recibidos en el servidor:', req.body); // Depuración de datos recibidos

      const { Cli_Nombre, Cli_RFC } = req.body;

      //En caso de que no se reciba algun dato manda un mensaje
      if (!Cli_Nombre || !Cli_RFC) {
          return res.status(400).json({ message: 'Nombre y RFC son requeridos.' });
      }

      //Crea el cliente
      const nuevoCliente = await Clientes.create({ Cli_Nombre, Cli_RFC });


      //Regresa un status 201, la creación fue correcta
      res.status(201).json(nuevoCliente);
  } catch (error) {
      console.error('Error al registrar cliente:', error);
      res.status(500).json({ message: 'Error al registrar el cliente.' });
  }
};
