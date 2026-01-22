import { useState } from "react";
import {
    getCart,
    removeFromCart,
    getTotal,
    clearCart
} from "../../util/cart";
import { API_URL, getToken, showMessage } from "../../util/Util";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(getCart());

    const auth = JSON.parse(localStorage.getItem("authData"));

    const [form, setForm] = useState({
        name: auth?.name || "",
        email: auth?.email || "",
        phone: "",
        address: "",
        paymentMethod: ""
    });

    const removeItem = (index) => {
        removeFromCart(index);
        setCart(getCart());
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCheckout = async () => {

        if (cart.length === 0) {
            showMessage("Carrito vacío", "Debes agregar productos antes de comprar", "warning");
            return;
        }

        if (!form.phone || !form.address || !form.paymentMethod) {
            showMessage("Datos incompletos", "Completa todos los datos de compra", "warning");
            return;
        }

        const order = {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            paymentMethod: form.paymentMethod,
            total: getTotal(),
            items: cart.map(m => ({
                movieId: m.id,
                name: m.name,
                price: m.price || 0
            }))
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
                showMessage("Compra exitosa", "Pedido registrado correctamente", "success", "OK");
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
                <div key={i} className="border p-2 mb-2 d-flex justify-content-between">
                    {m.name}
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItem(i)}
                    >
                        ❌
                    </button>
                </div>
            ))}

            <h4>Total: ${getTotal()}</h4>

            <h3 className="mt-4">📋 Datos de compra</h3>

            <input className="form-control mb-2" name="name" value={form.name} disabled />
            <input className="form-control mb-2" name="email" value={form.email} disabled />

            <input
                className="form-control mb-2"
                name="phone"
                placeholder="Teléfono"
                onChange={handleChange}
                required
            />

            <input
                className="form-control mb-2"
                name="address"
                placeholder="Dirección"
                onChange={handleChange}
                required
            />

            <select
                className="form-control mb-3"
                name="paymentMethod"
                onChange={handleChange}
                required
            >
                <option value="">Método de pago</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Tarjeta">Tarjeta</option>
            </select>

            <button className="btn btn-success w-100" onClick={handleCheckout}>
                Comprar
            </button>
        </div>
    );
};
