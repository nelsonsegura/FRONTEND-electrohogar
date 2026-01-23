import { useEffect, useState } from "react";
import { API_URL, getToken, showMessage } from "../../util/Util";

export const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        const res = await fetch(API_URL + "order", {
            headers: {
                Authorization: getToken()
            }
        });
        const data = await res.json();
        setOrders(data);
    };

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(API_URL + `order/${id}/${status}`, {
                method: "PUT",
                headers: {
                    Authorization: getToken()
                }
            });

            const data = await res.json();

            if (data.status === true) {
                showMessage("OK", "Estado actualizado", "success", "OK");
                loadOrders();
            } else {
                showMessage("Error", data.message, "error");
            }

        } catch {
            showMessage("Error", "No se pudo actualizar", "error");
        }
    };

    const getColor = (status) => {
        switch (status) {
            case "PENDING": return "warning";
            case "APPROVED": return "primary";
            case "REJECTED": return "danger";
            case "SHIPPED": return "success";
            default: return "secondary";
        }
    };

    return (
        <div className="container mt-4">
            <h3>📦 Panel de Pedidos</h3>

            <table className="table table-bordered mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
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
                            <td>{o.id}</td>
                            <td>{o.clientName}</td>
                            <td>{o.email}</td>
                            <td>${o.total}</td>
                            <td>{o.date}</td>
                            <td>
                                <span className={`badge bg-${getColor(o.status)}`}>
                                    {o.status}
                                </span>
                            </td>
                            <td>

                                {o.status === "PENDING" && (
                                    <>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => updateStatus(o.id, "APPROVED")}
                                        >
                                            Aprobar
                                        </button>

                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => updateStatus(o.id, "REJECTED")}
                                        >
                                            Rechazar
                                        </button>
                                    </>
                                )}

                                {o.status === "APPROVED" && (
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={() => updateStatus(o.id, "SHIPPED")}
                                    >
                                        Enviar
                                    </button>
                                )}

                                {o.status === "SHIPPED" && (
                                    <span className="text-success">✔ Enviado</span>
                                )}

                                {o.status === "REJECTED" && (
                                    <span className="text-danger">❌ Rechazado</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
