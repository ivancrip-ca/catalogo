  import { useEffect, useState } from "react";
  import Titulo from "../../components/Titulo";

  const PaginaFactura = () => {
   // Define los estados para almacenar datos de clientes, productos, selección del cliente y producto, factura y su estado de visualización
   const [clientes, setClientes] = useState([]); // Estado para almacenar la lista de clientes
   const [productos, setProductos] = useState([]); // Estado para almacenar la lista de productos
   const [clienteSeleccionado, setClienteSeleccionado] = useState(''); // Estado para almacenar el cliente seleccionado
   const [productoSeleccionado, setProductoSeleccionado] = useState(''); // Estado para almacenar el producto seleccionado
   const [factura, setFactura] = useState([]); // Estado para almacenar los productos en la factura
   const [mostrarFactura, setMostrarFactura] = useState(false); // Estado para determinar si se muestra la factura generada


    useEffect(() => {
      const fetchClientes = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/clientes'); // Solicitud para obtener clientes
            const data = await response.json(); // Convierte la respuesta a JSON
          setClientes(data);
        } catch (error) {
          console.error('Error al cargar los clientes:', error);
        }
      };

      const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/productos'); // Solicitud para obtener productos
            const data = await response.json(); // Convierte la respuesta a JSON
          setProductos(data);
        } catch (error) {
          console.error('Error al cargar los productos:', error);
        }
      };

   
      fetchClientes(); // Llama a la función para obtener clientes
      fetchProductos(); // Llama a la función para obtener productos
    }, []);

    const handleAgregarProducto = () => {
      if (productoSeleccionado) {
        const productoAgregado = productos.find(p =>
          (p.dataValues && p.dataValues.Pro_Id === parseInt(productoSeleccionado)) ||
          (p.Pro_Id === parseInt(productoSeleccionado))
        );
        if (productoAgregado) {
          const productoData = productoAgregado.dataValues || productoAgregado;
          setFactura([...factura, productoData]);
        }
        setProductoSeleccionado('');
      }
    };

    const handleGenerarFactura = async () => {
      if (clienteSeleccionado && factura.length > 0) {
          const total = calcularTotal();
          const subtotal = (total / 1.16).toFixed(2); 
  
          const facturaData = {
              Fact_Total: parseFloat((total * 1.16).toFixed(2)), // Total incluyendo IVA como número decimal
              Fact_SubTotal: parseFloat(subtotal), // Subtotal sin IVA como número decimal
              Fact_CliId: parseInt(clienteSeleccionado), // Asegúrate de que sea un número
          };
  
          console.log('Datos a enviar:', facturaData); // Depuración de datos a enviar
  
          try {
              const response = await fetch('http://localhost:3001/facturas/registro', {// Solicitud para obtener productos
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json', //Se convierten los datos a json
                  },
                  body: JSON.stringify(facturaData),
              });
  
              if (!response.ok) {
                  throw new Error('Error al generar la factura');
              }
  
              const data = await response.json();
              console.log('Factura generada:', data);
              setMostrarFactura(true);
          } catch (error) {
              console.error('Error al generar la factura:', error);
          }
      }
  };
  

  //Clase que calcula el total de l producto y lo reduce a dos decimales
    const calcularTotal = () => {
      return factura.reduce((total, producto) => total + parseFloat(producto.Pro_Precio), 0).toFixed(2);
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <Titulo pagina="Factura" />
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mt-6">
          {!mostrarFactura ? (
            <>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cliente" className="block text-sm font-medium text-gray-600">
                    Seleccionar Cliente
                  </label>
                  <select
                    id="cliente"
                    value={clienteSeleccionado}
                    onChange={(e) => setClienteSeleccionado(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Selecciona un cliente --</option>
                    {clientes.map(cliente => (
                      <option key={cliente.Cli_Id} value={cliente.Cli_Id}>
                        {cliente.Cli_Nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="producto" className="block text-sm font-medium text-gray-600">
                    Seleccionar Producto
                  </label>
                  <select
                    id="producto"
                    value={productoSeleccionado}
                    onChange={(e) => setProductoSeleccionado(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Selecciona un producto --</option>
                    {productos.map(producto => {
                      const productoData = producto.dataValues || producto;
                      return (
                        <option key={productoData.Pro_Id} value={productoData.Pro_Id}>
                          {productoData.Pro_Nombre} - ${productoData.Pro_Precio}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    onClick={handleAgregarProducto}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Agregar Producto
                  </button>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    onClick={handleGenerarFactura}
                    className="px-6 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Generar Factura
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <div className="flex justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold">Factura</h2>
                  <p className="text-sm">Fecha: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-semibold">De: Empresa prueba</h3>
                  <p className="text-sm">Nombre del Cliente: {clientes.find(c => c.Cli_Id === parseInt(clienteSeleccionado))?.Cli_Nombre || 'N/A'}</p>
                  <p className="text-sm">RFC del Cliente: {clientes.find(c => c.Cli_Id === parseInt(clienteSeleccionado))?.Cli_RFC || 'N/A'}</p>
                </div>
              </div>

              <table className="w-full mb-4 border-t border-b border-gray-200">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left p-2">Producto</th>
                    <th className="text-right p-2">Cantidad</th>
                    <th className="text-right p-2">Precio Unidad</th>
                    <th className="text-right p-2">Importe</th>
                  </tr>
                </thead>
                <tbody>
                  {factura.map((producto, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="p-2">{producto.Pro_Nombre}</td>
                      <td className="p-2 text-right">1</td>
                      <td className="p-2 text-right">${parseFloat(producto.Pro_Precio).toFixed(2)}</td>
                      <td className="p-2 text-right">${parseFloat(producto.Pro_Precio).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end space-y-2 mt-4">
                <div className="text-right">
                  <p className="font-semibold">Subtotal: ${calcularTotal()}</p>
                  <p className="font-semibold">Descuento: $0.00</p>
                  <p className="font-semibold">IVA (16%): ${(calcularTotal() * 0.16).toFixed(2)}</p>
                  <p className="font-bold text-lg">Total: ${(calcularTotal() * 1.16).toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default PaginaFactura;


