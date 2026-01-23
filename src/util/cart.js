export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
};

export const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (movie) => {
    const cart = getCart();
    cart.push(movie);
    saveCart(cart);
};

export const removeFromCart = (index) => {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
};

export const clearCart = () => {
    localStorage.removeItem("cart");
};

export const getTotal = () => {
    const cart = getCart();
    return cart.reduce((sum, m) => sum + (m.price || 0), 0);
};
