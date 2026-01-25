import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";

export const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await fetch(API_URL + "order");
        const data = await res.json();
        setOrders(data.reverse());
    };

    const changeStatus = async (id, status) => {
        await fetch(API_URL + `order/${id}/${status}`, { method: "PUT" });
        load();
    };

    const badge = (s) => {
        if (s === "PENDING") return <span className="badge bg-warning">Pendiente</span>;
        if (s === "APPROVED") return <span className="badge bg-primary">Aprobado</span>;
        if (s === "REJECTED") return <span className="badge bg-danger">Rechazado</span>;
        if (s === "SHIPPED") return <span className="badge bg-success">Enviado</span>;
    };

    return (
        <div className="container mt-4">
            <h2>📦 Gestión de pedidos</h2>

            <table className="table table-hover mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Email</th>
                        <th>Total</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(o => (
                        <tr key={o.id}>
                            <td>{o.id.slice(-6)}</td>
                            <td>{o.clientName}</td>
                            <td>{o.email}</td>
                            <td>${o.total}</td>
                            <td>{o.date}</td>
                            <td>{badge(o.status)}</td>

                            <td>
                                {o.status === "PENDING" && (
                                    <>
                                        <button onClick={() => changeStatus(o.id, "APPROVED")}
                                            className="btn btn-sm btn-success me-1">
                                            ✔ Aprobar
                                        </button>
                                        <button onClick={() => changeStatus(o.id, "REJECTED")}
                                            className="btn btn-sm btn-danger">
                                            ❌ Rechazar
                                        </button>
                                    </>
                                )}

                                {o.status === "APPROVED" && (
                                    <button onClick={() => changeStatus(o.id, "SHIPPED")}
                                        className="btn btn-sm btn-primary">
                                        🚚 Enviar
                                    </button>
                                )}

                                {o.status === "SHIPPED" && "✔ Enviado"}
                                {o.status === "REJECTED" && "❌ Cancelado"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
