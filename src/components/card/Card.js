import { Link } from "react-router-dom";
import "./Card.css";

export const Card = ({ id, name, description, image, price, discount = 0, category }) => {

  const finalPrice = discount > 0
    ? price - (price * discount / 100)
    : price;

  return (
    <div className="card col-sm-6 col-md-4 col-lg-4 col-xl-3 p-2">

      <Link className="btn btn-light p-0 h-100" to={`/movie/${id}`}>

        <div className="position-relative">
          <img
            src={image}
            className="card-img-top"
            alt="imagen no encontrada"
            style={{ height: "220px", objectFit: "cover" }}
          />

          {/* 🔥 Badge descuento */}
          {discount > 0 && (
            <span className="badge bg-danger position-absolute top-0 end-0 m-2">
              -{discount}%
            </span>
          )}
        </div>

        <div className="card-body text-start">

          <h5 className="card-title">{name}</h5>

          {/* 💲 Precio */}
          {discount > 0 && (
            <div className="text-muted text-decoration-line-through">
              ${price?.toLocaleString("es-CO")}
            </div>
          )}

          <div className="fw-bold text-success fs-5">
            ${finalPrice?.toLocaleString("es-CO")}
          </div>

          {/* 🧊 Categoría */}
          {category && (
            <span className="badge bg-primary mt-2">
              {category}
            </span>
          )}

        </div>

      </Link>
    </div>
  );
};
