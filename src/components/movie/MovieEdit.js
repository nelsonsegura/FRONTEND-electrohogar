import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, getToken, showMessage } from "../../util/Util";

export const MovieEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        trailerLink: "",
        imageLink: "",
        price: "",
        categories: null,
        staffList: null,
    });

    useEffect(() => {
        loadMovie();
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const res = await fetch(API_URL + "category");
        const data = await res.json();
        setCategories(data);
    };

    const loadMovie = async () => {
        let response = await fetch(API_URL + "movie/" + id);
        response = await response.json();

        setFormData({
            name: response.name || "",
            description: response.description || "",
            trailerLink: response.trailerLink || "",
            imageLink: response.imageLink || "",
            price: response.price || "",
            categories: response.categories || null,
            staffList: response.staffList || null,
        });

        // Asignar la categoría actual
        setCategoryId(response.categories?.[0]?.id || "");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            ...formData,
            price: parseFloat(formData.price),
            category: {
                id: categoryId
            }
        };

        try {
            const response = await fetch(API_URL + "movie/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + getToken(),
                },
                body: JSON.stringify(body),
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
                    name="price"
                    type="number"
                    value={formData.price}
                    placeholder="Precio"
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

                {/* 🔥 Selector de categoría */}
                <select
                    className="form-control mb-3"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                >
                    <option value="">Seleccione una categoría</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>

                <button className="btn btn-warning w-100">
                    Actualizar producto
                </button>

            </form>
        </div>
    );
};
