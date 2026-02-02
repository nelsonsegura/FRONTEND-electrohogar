import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="row text-center text-md-start align-items-center">

          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="fw-bold">ELECTRO HOGAR</h5>
            <p className="small text-muted">
              Tu tienda de electrodomésticos en línea
            </p>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="fw-bold">Contacto</h6>
            <p className="small mb-1">📧 soporte@electrohogar.com</p>
            <p className="small">📞 +57 300 234 6879</p>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold">Síguenos</h6>
            <div className="social-icons">
              <span>🌐</span>
              <span>📘</span>
              <span>📸</span>
              <span>🐦</span>
            </div>
          </div>

        </div>

        <hr />

        <div className="text-center small text-muted">
          © 2025 ELECTRO HOGAR - Todos los derechos reservados BY NELSON ARLEY SEGURA
        </div>
      </div>
    </footer>
  );
};

export default Footer;
