import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";

export const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        let res = await fetch(API_URL + "order");
        let data = await res.json();
        setOrders(data);
    };

    const updateStatus = async (id, status) => {
        await fetch(API_URL + `order/${id}/${status}`, { method: "PUT" });
        loadOrders();
    };

    return (
        <div className="container">
            <h3>🛒 Pedidos</h3>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
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
                            <td>${o.total}</td>
                            <td>{o.date}</td>
                            <td>{o.status}</td>
                            <td>
                                <button onClick={() => updateStatus(o.id, "ENVIADO")} className="btn btn-success btn-sm">
                                    Enviar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
