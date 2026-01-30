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
    <div className="movie-container">
      <iframe
        id="myVideo"
        width="560"
        height="515"
        src={
          !movie.trailerLink
            ? "https://www.youtube-nocookie.com/embed/4Lp-Vc4i2QI"
            : movie.trailerLink
        }
        title={movie.name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div className="main-container">
        <div className="content">
          <h1>{movie.name}</h1>
          <p>{movie.description}</p>
          <h3 className="text-success mt-2">
            $ {movie.price?.toLocaleString("es-CO")}
          </h3>

          {/* ================= BOTONES ADMIN ================= */}
          {isAdmin() && (
            <div className="mb-3">
              <Link
                to={`/movies/edit/${movie.id}`}
                className="btn btn-warning me-2"
              >
                Editar
              </Link>

              <button className="btn btn-danger" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          )}

          <div className="staff-list">
            {movie.staffList && movie.staffList.length > 0
              ? movie.staffList.map((staff, idx) => (
                <p key={idx}>
                  {staff.name} {staff.lastName} ({staff.rol})
                </p>
              ))
              : ""}
          </div>

          <div className="category-list">
            {movie.categories && movie.categories.length > 0
              ? movie.categories.map((staff, idx) => (
                <p key={idx}>{staff.name}</p>
              ))
              : ""}
          </div>

          {/* ================= CLIENTE ================= */}
          {!isAdmin() && (
            <div className="mt-4">
              <Link to="/pedidos">
                <button className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto">
                  COMPRAR
                </button>

                <button
                  className="btn btn-primary mt-2"
                  onClick={handleAddCart}
                >
                  Agregar al carrito
                </button>

              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
