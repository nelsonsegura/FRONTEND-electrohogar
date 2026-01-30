import { useEffect, useState } from "react";
import { API_URL, showMessage } from "../../util/Util";

export const MyProfile = () => {
    const auth = JSON.parse(localStorage.getItem("authData"));
    const [client, setClient] = useState({});

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const res = await fetch(API_URL + "client/" + auth.id);
        const data = await res.json();
        setClient(data);
    };


    // 👇 AQUÍ VA
    if (!client.id) {
        return <p>Cargando perfil...</p>;
    }

    const handleChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const updateProfile = async () => {
        const payload = {
            ...client,
            id: auth.id   // 🔥 ESTO ES LO QUE TE FALTABA
        };

        await fetch(API_URL + "client", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        showMessage("OK", "Perfil actualizado", "success");
    };


    const deleteAccount = async () => {
        if (!window.confirm("¿Eliminar tu cuenta definitivamente?")) return;

        await fetch(API_URL + "client/" + auth.id, { method: "DELETE" });
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <div className="container mt-4">
            <h3>Mi perfil</h3>

            <input
                className="form-control mb-2"
                name="name"
                value={client.name || ""}
                onChange={handleChange}
                placeholder="Nombre"
            />

            <input
                className="form-control mb-2"
                name="lastName"
                value={client.lastName || ""}
                onChange={handleChange}
                placeholder="Apellido"
            />



            <input
                type="date"
                className="form-control mb-2"
                name="birthDate"
                value={client.birthDate || ""}
                onChange={handleChange}
            />

            <input
                className="form-control mb-3"
                name="phone"
                value={client.phone || ""}
                onChange={handleChange}
                placeholder="Teléfono"
            />

            <button className="btn btn-primary w-100 mb-2" onClick={updateProfile}>
                Guardar cambios
            </button>

            <button className="btn btn-danger w-100" onClick={deleteAccount}>
                Eliminar mi cuenta
            </button>
        </div>
    );
};
