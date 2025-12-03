import React from 'react';
import './bienvenido.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="container">

      <main>
        <div className="menu2">
          <p>
            bienvenidos a la tienda <br /> ELECTROHOGAR
          </p>
        </div>
        <div className="video">
          <li>
            <h2>💻 Quiénes Somos</h2>
            <h3> somos un emprendimiento digital nacido con la misión de
              modernizar la experiencia de compra de electrodomésticos para los habitantes del
              municipio de Villeta y sus alrededores. Entendemos las necesidades de nuestro mercado local
              y la importancia de tener acceso a tecnología de calidad sin complicaciones.</h3>
          </li>
          <li>
            <h2>1. Políticas de Privacidad</h2>
            <h3>Recopilamos datos personales (nombre, dirección de Villeta, email, teléfono, detalles de pago) solo para procesar pedidos,
              gestionar la entrega en la región y mejorar el servicio. Sus datos están protegidos y no serán compartidos con terceros,
              salvo por obligación legal o para completar el envío de su electrodoméstico. El usuario tiene derecho a acceder,
              rectificar o eliminar su información en cualquier momento.</h3>

            <h2>2. Términos y Condiciones de Venta</h2>
            <h3>
              Estos términos rigen la compra de electrodomésticos en nuestra plataforma. El cliente debe tener capacidad legal para contratar.
              Los precios y la disponibilidad están sujetos a cambios sin previo aviso. La compra se considera aceptada tras la verificación del pago.
              Garantía y Devoluciones: Todo producto cuenta con la garantía legal ofrecida por el fabricante.
              No cubre daños por mala instalación (si fue realizada por terceros no autorizados) o uso indebido. Las devoluciones deben notificarse en un plazo específico después de la entrega en Villeta.
            </h3>
          </li>
        </div>
      </main>







    </div>
  );
}

export default App;
