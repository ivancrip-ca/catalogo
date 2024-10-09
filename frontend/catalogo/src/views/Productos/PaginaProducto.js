import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Titulo from "../../components/Titulo";

// Definición del componente PaginaProducto
const PaginaProducto = () => {
    // Declaración de estados para manejar los datos del producto
    const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre del producto
    const [descripcion, setDescripcion] = useState(''); // Estado para almacenar la descripción del producto
    const [precio, setPrecio] = useState(''); // Estado para almacenar el precio del producto
    const navigate = useNavigate(); 

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            // Realiza una solicitud POST al servidor para registrar un nuevo producto
            const response = await fetch('http://localhost:3001/productos/registro', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' // Tipo de contenido de la solicitud
                },
               
                body: JSON.stringify({ Pro_Nombre: nombre, Pro_Descripcion: descripcion, Pro_Precio: precio }),
            });

            const data = await response.json(); 

            if (response.ok) { // Verifica si la respuesta fue exitosa
                console.log('Producto registrado con éxito:', data); 
                navigate('/'); 
            } else {
                console.error('Error al registrar el producto:', data.message); // Muestra un mensaje de error si la solicitud no fue exitosa
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100"> {/* Contenedor principal para centrar el contenido */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"> 
                <Titulo pagina="Producto" /> 
                <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center"> 
                    Registro de producto
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-600">
                            Nombre del producto
                        </label>
                        <input
                            type="text"
                            id="nombre" // ID del campo para referencias
                            name="nombre" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-600"> 
                            Detalles del producto
                        </label>
                        <input
                            type="text"
                            id="descripcion" // ID del campo para referencias
                            name="descripcion" 
                            value={descripcion} 
                            onChange={(e) => setDescripcion(e.target.value)} 
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="precio" className="block text-sm font-medium text-gray-600"> {/* Etiqueta para el campo de precio */}
                            Precio del producto
                        </label>
                        <input
                            type="number" // Tipo de campo numérico para el precio
                            id="precio" 
                            name="precio"
                            value={precio} 
                            onChange={(e) => setPrecio(e.target.value)} 
                            required 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-center mt-6"> 
                        <button
                            type="submit" 
                            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Registrar producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default PaginaProducto;
