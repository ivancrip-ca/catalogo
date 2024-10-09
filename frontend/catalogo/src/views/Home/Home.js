import {Link} from 'react-router-dom'

//Componente que contiene los 3 botones de las funciones

const Home = () => (
    <div className="flex items-center justify-center h-screen space-4">
      <div className="space-x-10">
        {/* Vista pagina de clientes */}
        <Link to="/PaginaClientes">
          <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold p-10 rounded text-2xl">Clientes</button>
        </Link>
         {/* Vista pagina de productos */}
        <Link to="/PaginaProducto">
          <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold p-10 rounded text-2xl">Producto</button>
        </Link>
         {/* Vista pagina de Facturas */}
        <Link to="/PaginaFactura">
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold p-10 rounded text-2xl">Factura</button>
        </Link>
      </div>
    </div>
  );

  export default Home