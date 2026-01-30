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
    return getCart().reduce((sum, m) => sum + getRealPrice(m), 0);
};


export const getRealPrice = (product) => {
    if (!product.discount || product.discount === 0) return product.price;

    return product.price - (product.price * product.discount / 100);
};
