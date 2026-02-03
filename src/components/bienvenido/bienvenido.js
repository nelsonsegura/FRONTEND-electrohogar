import React from "react";

export const About = () => {
  return (
    <div className="container py-5">

      {/* HERO */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">
          Bienvenido a <span className="text-primary">ELECTROHOGAR</span>
        </h1>
        <p className="text-muted fs-5">
          Tu tienda digital de electrodomésticos en Villeta
        </p>
      </div>

      {/* QUIÉNES SOMOS */}
      <div className="row mb-5 align-items-center">
        <div className="col-md-6 mb-3">
          <img
            src="https://images.unsplash.com/photo-1581090700227-1e37b190418e"
            className="img-fluid rounded shadow"
            alt="Electrohogar"
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">💻 Quiénes somos</h2>
          <p className="text-muted">
            Somos un emprendimiento digital nacido con la misión de modernizar
            la experiencia de compra de electrodomésticos para los habitantes
            del municipio de Villeta y sus alrededores.
          </p>
          <p className="text-muted">
            Entendemos las necesidades del mercado local y la importancia de
            tener acceso a tecnología de calidad sin complicaciones.
          </p>
        </div>
      </div>

      {/* POLÍTICAS */}
      <div className="row g-4">

        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h4 className="fw-bold mb-3">🔐 Políticas de privacidad</h4>
              <p className="text-muted">
                Recopilamos datos personales como nombre, dirección, correo,
                teléfono y detalles de pago únicamente para procesar pedidos,
                gestionar la entrega y mejorar el servicio.
              </p>
              <p className="text-muted">
                Tus datos están protegidos y no serán compartidos con terceros,
                salvo por obligación legal o para completar el envío.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h4 className="fw-bold mb-3">📜 Términos y condiciones</h4>
              <p className="text-muted">
                Estos términos rigen la compra de electrodomésticos en nuestra
                plataforma. El cliente debe tener capacidad legal para contratar.
              </p>
              <p className="text-muted">
                Todos los productos cuentan con garantía del fabricante.
                Las devoluciones deben notificarse dentro del plazo legal.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
