import api from "../lib/api";

export const getInvoices = async () => {
    const res = await api.get("/api/invoices");
    return res.data;
}

export const createInvoice = async (data) => {
    const res = await api.post("/api/invoices",data)
    return res.data;
}

export const updateInvoice = async (id,data) => {
    const res = await api.put(`/api/invoices/${id}`,data);
    return res.data;
}

export const deleteInvoice = async (id) => {
    const res = await api.delete(`/api/invoices/${id}`);
    return res.data;
}