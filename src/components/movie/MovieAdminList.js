import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, getToken, showMessage } from "../../util/Util";

export const MovieAdminList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        let response = await fetch(API_URL + "movie");
        response = await response.json();
        setMovies(response);
    };

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

            <Link to="/movies/create" className="btn btn-success mb-3">
                ➕ Crear producto
            </Link>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
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
                    ))}
                </tbody>
            </table>
        </div>
    );
};
