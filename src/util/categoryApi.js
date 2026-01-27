import { API_URL } from "./Util";

export const getCategories = async () => {
    const res = await fetch(API_URL + "category");
    return await res.json();
};
