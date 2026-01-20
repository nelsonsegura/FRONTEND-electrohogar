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

            if (response.ok) {
                showMessage("OK", "Producto creado", "success", "OK");
                navigate("/admin/movies");
            } else {
                showMessage("Error", data.message || "Error", "error");
            }
        } catch (error) {
            showMessage("Error", "Error de conexión", "error");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Crear producto</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    name="name"
                    placeholder="Nombre"
                    onChange={handleChange}
                    required
                />

                <textarea
                    className="form-control mb-2"
                    name="description"
                    placeholder="Descripción"
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-2"
                    name="trailerLink"
                    placeholder="Link video"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="imageLink"
                    placeholder="Link imagen"
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
