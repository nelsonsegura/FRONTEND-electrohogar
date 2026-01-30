import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";

export const MyOrders = () => {
    const auth = JSON.parse(localStorage.getItem("authData"));
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await fetch(API_URL + "order/client/" + auth.id);
        const data = await res.json();
        setOrders(data.reverse()); // más recientes primero
    };

    // Badge con colores
    const badge = (s) => {
        if (s === "PENDING") return <span className="badge bg-warning">Pendiente</span>;
        if (s === "APPROVED") return <span className="badge bg-primary">Aprobado</span>;
        if (s === "REJECTED") return <span className="badge bg-danger">Rechazado</span>;
        if (s === "SHIPPED") return <span className="badge bg-success">Enviado</span>;
    };

    // Iconos por estado (detalle pro)
    const statusIcon = {
        PENDING: "⏳",
        APPROVED: "✔",
        REJECTED: "❌",
        SHIPPED: "🚚"
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">🛒 Mis pedidos</h2>

            {orders.length === 0 && (
                <p className="text-muted">No tienes pedidos aún</p>
            )}

            <div className="row">
                {orders.map(o => (
                    <div className="col-md-4 mb-3" key={o.id}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {statusIcon[o.status]} Pedido #{o.id.slice(-6)}
                                </h5>

                                <p className="mb-1">
                                    💰 <strong>Total:</strong> ${o.total.toLocaleString("es-CO")}
                                </p>

                                <p className="mb-1">
                                    📅 <strong>Fecha:</strong> {o.date}
                                </p>

                                <p>
                                    <strong>Estado:</strong>{" "}
                                    {badge(o.status)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
