import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Titulo from "../../components/Titulo"; 

// Se declara la vista de registro de clientes
const PaginaClientes = () => {
    // Declaración de estados para el nombre y el RFC del cliente
    const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre del cliente
    const [rfc, setRfc] = useState(''); // Estado para almacenar el RFC del cliente
    const navigate = useNavigate(); // Inicializa la función de navegación

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Realiza una solicitud POST al servidor para registrar un nuevo cliente
            const response = await fetch('http://localhost:3001/clientes/registro', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                // Convierte los datos del cliente a JSON
                body: JSON.stringify({ Cli_Nombre: nombre, Cli_RFC: rfc }),
            });

            const data = await response.json(); // Convierte la respuesta a formato JSON

            if (response.ok) { // Verifica si la respuesta fue exitosa
                console.log('Cliente registrado con éxito:', data); 
                navigate('/'); // Redirige al usuario a la página principal después del registro
            } else {
                console.error('Error al registrar el cliente:', data.message); // Muestra en consola un mensaje de error si la solicitud no fue exitosa
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"> {/* Contenedor principal del formulario */}
                <Titulo pagina="Clientes" /> 
                <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                    Registro de cliente
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4"> 
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-600">
                            Nombre del Cliente
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre} // Valor del campo input vinculado al estado
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="rfc" className="block text-sm font-medium text-gray-600">
                            RFC
                        </label>
                        <input
                            type="text"
                            id="rfc"
                            name="rfc"
                            value={rfc} // Valor del campo input vinculado al estado
                            onChange={(e) => setRfc(e.target.value)}
                            required 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit" 
                            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Registrar Cliente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default PaginaClientes;
