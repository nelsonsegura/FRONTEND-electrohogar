import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, getToken, showMessage } from "../../util/Util";

export const MovieAdminList = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 5;

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        let response = await fetch(API_URL + "movie");
        response = await response.json();
        setMovies(response);
    };

    // 🔍 FILTRO POR NOMBRE
    const filteredMovies = movies.filter((movie) =>
        movie.name.toLowerCase().includes(search.toLowerCase())
    );

    // 📄 PAGINACIÓN
    const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedMovies = filteredMovies.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    const deleteMovie = async (id) => {
        if (!window.confirm("¿Eliminar este producto?")) return;

        try {
            const response = await fetch(API_URL + "movie/" + id, {
                method: "DELETE",
                headers: {
                    Authorization: getToken(),
                },
            });

            if (response.ok) {
                showMessage("OK", "Producto eliminado", "success", "OK");
                loadMovies();
            } else {
                showMessage("Error", "No se pudo eliminar", "error");
            }
        } catch (error) {
            showMessage("Error", "Error de conexión", "error");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Administración de productos</h2>

            {/* 🔍 BUSCADOR */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1); // reset página
                }}
            />

            <Link to="/movies/create" className="btn btn-success mb-3">
                ➕ Crear producto
            </Link>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th style={{ width: "200px" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedMovies.length > 0 ? (
                        paginatedMovies.map((movie) => (
                            <tr key={movie.id}>
                                <td>{movie.name}</td>
                                <td>{movie.description}</td>
                                <td>
                                    <Link
                                        to={`/movies/edit/${movie.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        ✏️ Editar
                                    </Link>

                                    <button
                                        onClick={() => deleteMovie(movie.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        🗑️ Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">
                                No hay productos
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* 📄 PAGINACIÓN */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                    <nav>
                        <ul className="pagination">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? "active" : ""
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};
