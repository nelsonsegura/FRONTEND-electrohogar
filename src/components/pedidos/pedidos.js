import './pedidos.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [phone, setPhone] = useState("");
  const [direccion, setDireccion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !metodoPago || !phone || !direccion) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: '⚠️ Debe llenar todos los campos antes de comprar.',
        confirmButtonColor: '#f87171',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Compra exitosa',
        text: '✅ Su compra fue realizada con éxito.',
        confirmButtonColor: '#22c55e',
      }).then(() => {
        // 👇 Redirige automáticamente a /productos
        window.location.href = "/productos";
      });
    }
  };

  return (
    <div className="container">
      <header className="text-gray-600 body-font">


        <span className="menu">PEDIDOS </span>

      </header>

      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg">
                Por favor llene los siguientes datos que se le piden a continuacion
                para realizar la compra en nuestra tienda
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Nombre completo"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Email o Correo"
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <select
                      id="pago"
                      value={metodoPago}
                      onChange={(e) => setMetodoPago(e.target.value)}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    >
                      <option value="" disabled>Selecciona un método de pago</option>
                      <option value="tarjeta">Tarjeta de crédito / débito</option>
                      <option value="efectivo">Efectivo</option>
                      <option value="transferencia">Transferencia bancaria</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>

                  <div>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Número de teléfono"
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Dirección"
                      type="text"
                      id="direccion"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black2 px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    COMPRAR
                  </button>
                </div>

                <div className="mt-4">
                  <Link to="/" className="mr-5 hover:text-gray-900">
                    <button
                      type="button"
                      className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                    >
                      CANCELAR
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 rounded-lg bg-indigo-600 p-6 shadow-lg sm:flex-row sm:justify-between">
            <strong className="text-xl text-white sm:text-xl">
              Estos son los productos con descuento!
            </strong>

            <a
              className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-8 py-3 text-indigo-600 hover:bg-transparent hover:text-white focus:outline-none focus:ring active:bg-white/90"
              href="/descuentos"
            >
              <span className="text-sm font-medium"> ver descuentos</span>
              <svg
                className="h-5 w-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
