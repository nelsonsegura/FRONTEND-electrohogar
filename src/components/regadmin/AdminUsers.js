import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const res = await fetch(API_URL + "client");
        const data = await res.json();
        setUsers(data);
    };

    const deleteUser = async (id) => {
        if (!window.confirm("¿Eliminar este usuario?")) return;
        await fetch(API_URL + "client/" + id, { method: "DELETE" });
        loadUsers();
    };

    return (
        <div className="container">
            <h3>Usuarios</h3>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteUser(u.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
