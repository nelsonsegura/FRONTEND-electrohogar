import { useEffect, useState } from "react";
import { API_URL, showMessage } from "../../util/Util";

export const MyProfileAdmin = () => {
    const auth = JSON.parse(localStorage.getItem("authData"));
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const res = await fetch(API_URL + "admin/" + auth.id);
        const data = await res.json();
        setAdmin(data);
    };

    // ⏳ Loader
    if (!admin.id) {
        return <p>Cargando perfil de administrador...</p>;
    }

    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const updateProfile = async () => {
        await fetch(API_URL + "admin", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(admin),
        });

        showMessage("OK", "Perfil de administrador actualizado", "success");
    };

    return (
        <div className="container mt-4">
            <h3>Mi perfil (Administrador)</h3>

            <input
                className="form-control mb-2"
                name="name"
                value={admin.name || ""}
                onChange={handleChange}
                placeholder="Nombre"
            />

            <input
                className="form-control mb-2"
                name="lastName"
                value={admin.lastName || ""}
                onChange={handleChange}
                placeholder="Apellido"
            />
            <input
                type="date"
                className="form-control mb-2"
                name="birthDate"
                value={admin.birthDate || ""}
                onChange={handleChange}
            />

            <input
                className="form-control mb-2"
                name="email"
                value={admin.email || ""}
                disabled
            />

            <input
                className="form-control mb-3"
                name="phone"
                value={admin.phone || ""}
                onChange={handleChange}
                placeholder="Teléfono"
            />

            <button className="btn btn-primary w-100" onClick={updateProfile}>
                Guardar cambios
            </button>
        </div>
    );
};
