import React from 'react';
import './descuentos.css';
import { Link } from 'react-router-dom';
import imagen1 from './16015605-800-auto.jpg';
import imagen2 from './freidora.jpg';
import imagen3 from './olla.jpg';
import imagen4 from './estufa.jpg'


function App() {
  return (
    <div className="container">
      <main>
        <div className="menu">
          <p>PRODUCTOS EN DESCUENTO</p>
        </div>
        <div className="cont-img">
          <li>
            <h2>Lavadora SAMSUNG</h2>
            <Link to="/pedidos" className="mr-5 hover:text-gray-900">
              <img src={imagen1} alt="Imagen 1" />
            </Link>
            <p className="descripcion">Lavadora SAMSUNG Carga Superior 15 kg (33 lb)</p>
            <p className="precio">$ 1.699.900 pesos</p>
            <p className="desc">- 7%</p>
          </li>
          <li>
            <h2>Freidora de aire</h2>
            <Link to="/pedidos" className="mr-5 hover:text-gray-900">
              <img src={imagen2} alt="imagen 2" />
            </Link>
            <p className="descripcion">Freidora de aire Manual 4Lts DF OSTER</p>
            <p className="precio">$ 623.200 pesos</p>
            <p className="desc">- 15%</p>
          </li>
        </div>
        <div className="cont-img">
          <li>
            <h2>Estufa</h2>
            <Link to="/pedidos" className="mr-5 hover:text-gray-900">
              <img src={imagen4} alt="imagen 4" />
            </Link>
            <p className="descripcion">Estufa Romero 50T Gn Ne HACEB</p>
            <p className="precio">$ 634.708</p>
            <p className="desc">- 25%</p>
          </li>
          <li>
            <h2>Olla A Presión</h2>
            <Link to="/pedidos" className="mr-5 hover:text-gray-900">
              <img src={imagen3} alt="imagen 3" />
            </Link>
            <p className="descripcion">Olla A Presión Digital Multico BLACK & DECKER</p>
            <p className="precio">$ 346.905 pesos</p>
            <p className="desc">- 25%</p>
          </li>
        </div>
      </main>
    </div>
  );
}

export default App;
