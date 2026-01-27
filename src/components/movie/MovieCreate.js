import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, getToken, showMessage } from "../../util/Util";
import { getCategories } from "../../util/categoryApi";

export const MovieCreate = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        trailerLink: "",
        imageLink: "",
        price: "",
        categoryId: ""
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            description: formData.description,
            trailerLink: formData.trailerLink,
            imageLink: formData.imageLink,
            price: parseFloat(formData.price),
            category: {
                id: formData.categoryId
            }
        };


        try {
            const res = await fetch(API_URL + "movie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: getToken()
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.status === true || res.ok) {
                showMessage("OK", "Producto creado", "success", "OK");
                navigate("/admin/movies");
            } else {
                showMessage("Error", data.message, "error");
            }
        } catch {
            showMessage("Error", "Error de conexión", "error");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Crear producto</h2>

            <form onSubmit={handleSubmit}>
                <input className="form-control mb-2" name="name" placeholder="Nombre" onChange={handleChange} required />
                <textarea className="form-control mb-2" name="description" placeholder="Descripción" onChange={handleChange} required />
                <input className="form-control mb-2" name="price" placeholder="Precio" type="number" onChange={handleChange} required />
                <input className="form-control mb-2" name="trailerLink" placeholder="Link video" onChange={handleChange} />
                <input className="form-control mb-2" name="imageLink" placeholder="Link imagen" onChange={handleChange} required />

                <select className="form-control mb-3" name="categoryId" onChange={handleChange} required>
                    <option value="">Seleccione una categoría</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>

                <button className="btn btn-success w-100">Guardar producto</button>
            </form>
        </div>
    );
};
