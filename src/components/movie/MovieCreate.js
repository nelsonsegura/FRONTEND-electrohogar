import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, getToken, showMessage } from "../../util/Util";

export const MovieCreate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        trailerLink: "",
        imageLink: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(API_URL + "movie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: getToken(),
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.status === true || response.ok) {
                showMessage("Éxito", "Producto creado correctamente", "success", "OK");
                navigate("/movies");
            } else {
                showMessage("Error", data.message || "Error al crear", "error");
            }
        } catch (error) {
            showMessage("Error", "Error de conexión", "error");
        }
    };

    return (
        <div className="container">
            <h2>Crear producto</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Nombre del producto"
                    className="form-control mb-2"
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Descripción"
                    className="form-control mb-2"
                    onChange={handleChange}
                    required
                />

                <input
                    name="trailerLink"
                    placeholder="Link video (YouTube)"
                    className="form-control mb-2"
                    onChange={handleChange}
                />

                <input
                    name="imageLink"
                    placeholder="Link imagen"
                    className="form-control mb-3"
                    onChange={handleChange}
                    required
                />

                <button className="btn btn-success w-100">
                    Guardar producto
                </button>
            </form>
        </div>
    );
};
