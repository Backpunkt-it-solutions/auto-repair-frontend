import api from "../lib/api";

export const getVehicles = async () => {
    const res = await api.get("/api/vehicles");
    return res.data;
}

export const createVehicle = async (data) => {
    const res = await api.post("/api/vehicles",data);
    return res.data;
}

export const updateVehicle = async (id, data) => {
    const res = await api.put(`/api/vehicles/${id}`,data);
    return res.data;
}

export const deleteVehicle = async (id) => {
    const res = await api.delete(`/api/vehicles/${id}`)
    return res.data;
}