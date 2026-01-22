import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";

export const AdminAdmins = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(API_URL + "admin")
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <div className="container">
            <h3>👥 Comerciantes</h3>
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
