import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5007",
  
});
//request interceptor
api.interceptors.request.use((config) => {
  try {
    const saved = localStorage.getItem("auth");

    if (saved) {
      const auth = JSON.parse(saved);
      if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
    }
  } catch (error) {
    console.error("Invalid auth in local storage", error)
  } 

  return config;
},
  (error) => Promise.reject(error)
);

//response interceptor(handle 401)
api.interceptors.response.use((response) => 
  response,

  (error) => {
    if(error.response?.status === 401) {
     const saved = localStorage.getItem("auth");

     if(saved){
        console.warn("Session expired. Logging out...");
        localStorage.removeItem("auth");
        window.location.href = "/login";
     }
    }
    if(!error.response) {
      console.warn("Network/CORS error")
    }
    return Promise.reject(error)
  }
)

export default api;
