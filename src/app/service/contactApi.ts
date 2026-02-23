import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const fetchContacts = (params?: any) => API.get("/contacts", { params });

export const deleteContact = (id: string) => API.delete(`/contacts/${id}`);

export const updateContactStatus = (id: string, status: string) =>
  API.put(`/contacts/${id}`, { status });

export const sendContactForm = (data: any) => API.post("/contact", data);
