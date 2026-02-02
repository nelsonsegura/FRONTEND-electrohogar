import "./Content.css";
import { Card } from "../card/Card";
import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";
import { useLocation } from "react-router-dom";

export const Content = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const selectedCategory = params.get("category");
  const onlyOffers = params.get("offers");

  useEffect(() => {
    getMoviesAsync();
  }, [location.search]);

  const getMoviesAsync = async () => {
    try {
      setLoading(true);
      let response = await fetch(API_URL + "movie");
      let data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error cargando productos", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FILTRADO
  let filtered = movies;

  if (selectedCategory) {
    filtered = filtered.filter(m => m.category?.id === selectedCategory);
  }

  if (onlyOffers) {
    filtered = filtered.filter(m => m.discount && m.discount > 0);
  }

  return (
    <div className="container mt-4">

      {/* TÍTULO DINÁMICO */}
      <h3 className="mb-4 fw-bold">
        {onlyOffers ? "🔥 Productos en oferta" :
          selectedCategory ? "📂 Productos por categoría" :
            "🛒 Todos los productos"}
      </h3>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" />
          <p className="mt-2">Cargando productos...</p>
        </div>
      )}

      {/* SIN RESULTADOS */}
      {!loading && filtered.length === 0 && (
        <div className="empty-state">
          <h5>No se encontraron productos</h5>
          <p>Prueba con otra categoría u ofertas</p>
        </div>
      )}

      {/* GRID REAL */}
      <div className="row g-4">
        {filtered.map((movie, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Card
              id={movie.id}
              name={movie.name}
              description={movie.description}
              image={
                movie.imageLink || "https://picsum.photos/seed/picsum/300/200"
              }
              price={movie.price}
              discount={movie.discount || 0}
              category={movie.category?.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
