import { getCart, clearCart, getTotal } from "../../util/cart";
import { API_URL, getToken, showMessage } from "../../util/Util";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
    const navigate = useNavigate();
    const cart = getCart();

    const handleCheckout = async () => {
        const auth = JSON.parse(localStorage.getItem("authData"));

        const order = {
            clientId: auth.id,
            clientName: auth.name,
            email: auth.email,
            total: getTotal()
        };

        try {
            const res = await fetch(API_URL + "order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: getToken()
                },
                body: JSON.stringify(order)
            });

            if (res.ok) {
                clearCart();
                showMessage("Compra exitosa", "Tu pedido fue creado", "success", "OK");
                navigate("/movies");
            } else {
                showMessage("Error", "No se pudo crear el pedido", "error");
            }

        } catch {
            showMessage("Error", "Error de conexión", "error");
        }
    };

    return (
        <div className="container mt-4">
            <h2>🛒 Carrito</h2>

            {cart.map((m, i) => (
                <div key={i} className="border p-2 mb-2">
                    {m.name}
                </div>
            ))}

            <h4>Total: ${getTotal()}</h4>

            <button className="btn btn-success" onClick={handleCheckout}>
                Finalizar compra
            </button>
        </div>
    );
};
