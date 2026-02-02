import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Movie.css";
import { API_URL, getToken, showMessage } from "../../util/Util";
import { isAdmin } from "../../util/auth"; // ✅ NUEVO

import { addToCart } from "../../util/cart";

export const Movie = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [movieId, setMovieId] = useState("");
  const [movie, setMovie] = useState({});
  const [score, setScore] = useState([]);
  const [scoreSelected, setScoreSelected] = useState("");
  const [scoreId, setScoreId] = useState("");
  const [isActive, setIsActive] = useState(false);

  const finalPrice = movie.discount
    ? movie.price - (movie.price * movie.discount / 100)
    : movie.price;


  useEffect(() => {
    setMovieId(params.id);
    getMovie();
    setScoreData();
    checkScore();
    checkIsInList();
  }, [scoreSelected]);

  const getMovie = async () => {
    let response = await fetch(API_URL + "movie/" + params.id);
    response = await response.json();
    setMovie(response);
  };

  // ================= SCORE =================
  const checkScore = async () => {
    const requestData = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: getToken(),
      },
    };

    let response = await fetch(
      API_URL + "score/check/" + params.id,
      requestData
    );
    response = await response.json();

    if (response.id != null && response.score != null) {
      setScoreSelected(response.score);
      setScoreId(response.id);
    }
  };

  const sendScoreApi = async (score) => {
    let method = "post";
    if (scoreSelected !== "") {
      method = "put";
    }

    const scoreDTO = {
      score: score,
      movieId: movieId,
    };

    const requestData = {
      method,
      body: JSON.stringify(scoreDTO),
      headers: {
        "Content-type": "application/json",
        Authorization: getToken(),
      },
    };

    let response = await fetch(API_URL + "score/" + scoreId, requestData);
    response = await response.json();

    let icon = "warning";
    let confirmButtonText = "Reintentar";
    if (response.status === true) {
      icon = "success";
      confirmButtonText = "OK";
    }

    showMessage("", response.message, icon, confirmButtonText);
  };

  const setScoreData = () => {
    const scores = [];
    for (let index = 1; index <= 5; index++) {
      scores.push(index);
    }
    setScore(scores);
  };

  const sendScore = async (event) => {
    const { value } = event.target;
    await sendScoreApi(value);
    setScoreSelected(value);
  };

  const checkIsInList = () => {
    setIsActive(true);
  };

  // ================= ADMIN ACTIONS =================

  const handleDelete = async () => {
    const confirm = window.confirm(
      "¿Estás seguro de eliminar este producto?"
    );
    if (!confirm) return;

    const requestData = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: getToken(),
      },
    };

    let response = await fetch(API_URL + "movie/" + params.id, requestData);

    if (response.ok) {
      showMessage("Éxito", "Producto eliminado", "success", "OK");
      navigate("/movies");
    } else {
      showMessage("Error", "No se pudo eliminar", "error", "Reintentar");
    }
  };


  const handleAddCart = () => {
    addToCart({
      id: movie.id,
      name: movie.name,
      price: movie.price,
      discount: movie.discount,
      image: movie.imageLink
    });

    showMessage("Agregado", "Producto agregado al carrito", "success", "OK");
  };


  return (
    <div className="container mt-4">
      <div className="row g-4">

        {/* VIDEO / IMAGEN */}
        <div className="col-12 col-lg-6">
          <div className="ratio ratio-16x9 shadow rounded overflow-hidden">
            <iframe
              src={
                !movie.trailerLink
                  ? "https://www.youtube-nocookie.com/embed/4Lp-Vc4i2QI"
                  : movie.trailerLink
              }
              title={movie.name}
              allowFullScreen
            />
          </div>
        </div>

        {/* INFO PRODUCTO */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">

              <h2 className="fw-bold">{movie.name}</h2>

              <p className="text-muted">
                {movie.description}
              </p>

              <div className="mt-2">
                {movie.discount > 0 && (
                  <div>
                    <span className="text-muted text-decoration-line-through me-2">
                      $ {movie.price?.toLocaleString("es-CO")}
                    </span>

                    <span className="badge bg-danger">
                      -{movie.discount}%
                    </span>
                  </div>
                )}

                <h3 className="text-success fw-bold">
                  $ {finalPrice?.toLocaleString("es-CO")}
                </h3>
              </div>


              {/* CATEGORÍAS */}
              <div className="mt-2">
                {movie.categories?.map((c, idx) => (
                  <span key={idx} className="badge bg-secondary me-1">
                    {c.name}
                  </span>
                ))}
              </div>

              {/* STAFF */}
              <div className="mt-3">
                {movie.staffList?.map((s, idx) => (
                  <div key={idx} className="text-sm text-muted">
                    {s.name} {s.lastName} ({s.rol})
                  </div>
                ))}
              </div>

              {/* ESPACIO FLEX */}
              <div className="mt-auto">

                {/* ADMIN */}
                {isAdmin() && (
                  <div className="d-flex gap-2">
                    <Link
                      to={`/movies/edit/${movie.id}`}
                      className="btn btn-warning"
                    >
                      ✏ Editar
                    </Link>

                    <button
                      className="btn btn-danger"
                      onClick={handleDelete}
                    >
                      🗑 Eliminar
                    </button>
                  </div>
                )}

                {/* CLIENTE */}
                {!isAdmin() && (
                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={handleAddCart}
                  >
                    🛒 Agregar al carrito
                  </button>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};
