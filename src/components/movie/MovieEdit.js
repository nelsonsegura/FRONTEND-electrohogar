import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, getToken, showMessage } from "../../util/Util";

export const MovieEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        trailerLink: "",
        imageLink: "",
        categories: null,
        staffList: null,
    });

    useEffect(() => {
        loadMovie();
    }, []);

    const loadMovie = async () => {
        let response = await fetch(API_URL + "movie/" + id);
        response = await response.json();

        setFormData({
            name: response.name || "",
            description: response.description || "",
            trailerLink: response.trailerLink || "",
            imageLink: response.imageLink || "",
            categories: response.categories || null,
            staffList: response.staffList || null,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(API_URL + "movie/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + getToken(),
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.status !== false) {
                showMessage("Éxito", "Producto actualizado", "success", "OK");
                navigate("/movies");
            } else {
                showMessage("Error", data.message || "Error al actualizar", "error");
            }
        } catch (error) {
            showMessage("Error", "Error de conexión", "error");
        }
    };


    return (
        <div className="container">
            <h2>Editar producto</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={formData.name}
                    placeholder="Nombre del producto"
                    className="form-control mb-2"
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    value={formData.description}
                    placeholder="Descripción"
                    className="form-control mb-2"
                    onChange={handleChange}
                    required
                />

                <input
                    name="trailerLink"
                    value={formData.trailerLink}
                    placeholder="Link video (YouTube)"
                    className="form-control mb-2"
                    onChange={handleChange}
                />

                <input
                    name="imageLink"
                    value={formData.imageLink}
                    placeholder="Link imagen"
                    className="form-control mb-3"
                    onChange={handleChange}
                    required
                />

                <button className="btn btn-warning w-100">
                    Actualizar producto
                </button>
            </form>
        </div>
    );
};
