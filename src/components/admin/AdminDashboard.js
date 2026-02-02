import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";

export const AdminDashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        clients: 0,
        admins: 0,
        orders: 0,
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [moviesRes, clientsRes, adminsRes, ordersRes] = await Promise.all([
                fetch(API_URL + "movie"),
                fetch(API_URL + "client"),
                fetch(API_URL + "admin"),
                fetch(API_URL + "order"),   // 👈 FALTABA ESTE
            ]);

            const movies = await moviesRes.json();
            const clients = await clientsRes.json();
            const admins = await adminsRes.json();
            const orders = await ordersRes.json();

            setStats({
                products: movies.length || 0,
                clients: clients.length || 0,
                admins: admins.length || 0,
                orders: orders.length || 0,   // 👈 AHORA SÍ
            });
        } catch (error) {
            console.error("Error cargando dashboard", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>📊 Dashboard Administrador</h2>

            <div className="row mt-4">
                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Productos</h5>
                            <h2>{stats.products}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Clientes</h5>
                            <h2>{stats.clients}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Comerciantes</h5>
                            <h2>{stats.admins}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Pedidos</h5>
                            <h2>{stats.orders}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
