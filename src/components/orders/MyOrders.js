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
        setOrders(data.reverse());
    };

    return (
        <div className="container mt-4">
            <h2>🛒 Mis pedidos</h2>

            {orders.length === 0 && <p>No tienes pedidos aún</p>}

            {orders.map(o => (
                <div key={o.id} className="card p-3 mb-2 shadow-sm">
                    <b>Pedido:</b> {o.id.slice(-6)} <br />
                    <b>Total:</b> ${o.total} <br />
                    <b>Fecha:</b> {o.date} <br />
                    <b>Estado:</b> {o.status}
                </div>
            ))}
        </div>
    );
};

