import Facturas from "../models/facturas.js";

//Clase que llena los datos en la tabla de producto que se reciben en el front
const llenarFactura = async (req, res) => {
  try {
      console.log('Datos recibidos en el servidor:', req.body); // Depuración de datos recibidos

      const { Fact_Total, Fact_SubTotal, Fact_CliId } = req.body;

      //En caso de que no se reciba algun dato manda un mensaje
      if (!Fact_Total || !Fact_SubTotal || !Fact_CliId) {
          return res.status(400).json({ message: 'Los datos son requeridos' });
      }

      //Crea la factura
      const nuevaFactura = await Facturas.create({ Fact_Total, Fact_SubTotal, Fact_CliId });

      //Regresa un status 201, la creación fue correcta
      res.status(201).json(nuevaFactura);
  } catch (error) {
      console.error('Error al registrar la factura:', error);
      res.status(500).json({ message: 'Error al registrar la factura.' });
  }
};


export {llenarFactura}