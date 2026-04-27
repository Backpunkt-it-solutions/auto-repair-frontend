import api from "../lib/api";

export const getCustomers = async () => {
    const res = await api.get("/api/customers");
    return res.data;
}

export const createCustomer = async (data) => {
    const res = await api.post("/api/cusotmers");
    return res.data;
}

export const deleteCustomer = async(id) => {
    const res = await api.delete(`/api/customers/${id}`)
    return res.data;
}