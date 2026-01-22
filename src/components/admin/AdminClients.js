import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";

export const AdminClients = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(API_URL + "client")
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <div className="container">
            <h3>👥 Clientes</h3>
            <table className="table">
                <thead>
                    <tr><th>Nombre</th><th>Email</th></tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
