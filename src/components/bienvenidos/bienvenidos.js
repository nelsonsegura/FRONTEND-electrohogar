import React from "react";
import { Link } from "react-router-dom";

export const Contact = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">

          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4 p-md-5">

              <h2 className="text-center fw-bold mb-3">
                📞 Contáctanos
              </h2>

              <p className="text-center text-muted mb-4">
                Estamos comprometidos con brindarte el mejor soporte antes,
                durante y después de tu compra.
              </p>

              <div className="row text-center">

                <div className="col-md-6 mb-4">
                  <div className="p-4 border rounded-3 h-100">
                    <h4 className="fw-bold">📱 Teléfono</h4>
                    <p className="mb-1">300 234 6879</p>
                    <small className="text-muted">
                      Lunes a viernes 8am - 6pm
                    </small>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="p-4 border rounded-3 h-100">
                    <h4 className="fw-bold">✉️ Correo</h4>
                    <p className="mb-1">
                      soporte@electrohogar.com
                    </p>
                    <small className="text-muted">
                      Respuesta en menos de 24 horas
                    </small>
                  </div>
                </div>

              </div>

              <div className="text-center mt-4">
                <p className="text-muted">
                  También puedes gestionar tus pedidos desde tu cuenta
                </p>

                <Link to="/mis-pedidos" className="btn btn-primary">
                  🧾 Ver mis pedidos
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
