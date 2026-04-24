import api from "../lib/api"

export const getJobs = async () => {
    const res = await api.get("/api/jobs")
    return res.data;
}

export const createJob = async (payload) => {
    const res = await api.post("/api/jobs",payload);
    return res.data;
}

export const updateJob = async(id,payload) => {
    const res = await api.put(`/api/jobs/${id}`,payload)
    return res.data;
}

export const deleteJob = async (id) => {
    const res = await api.delete(`/api/jobs/${id}`);
    return res.data;
}