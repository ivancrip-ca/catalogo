import { Routes, Route } from 'react-router-dom';
import Home from '../views/Home/Home';
import PaginaClientes from '../views/Clientes/PaginaClientes';
import PaginaProducto from '../views/Productos/PaginaProducto';
import PaginaFactura from '../views/Facturas/PaginaFactura';


//Componente principal de la aplicación

const App = () =>{  
    return (
        <div className="App">
         
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/PaginaClientes" element={<PaginaClientes />} />
          <Route path="/PaginaProducto" element={<PaginaProducto />} />
          <Route path="/PaginaFactura" element={<PaginaFactura />} />
        </Routes>
      </div>
    )
}

export default App