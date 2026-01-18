export const isAdmin = () => {
    const authData = localStorage.getItem("authData");
    if (!authData) return false;

    const user = JSON.parse(authData);
    return user.role === "admin";
};
