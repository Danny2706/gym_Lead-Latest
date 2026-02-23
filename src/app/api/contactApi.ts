import axios from "axios";

const API_URL = "http://localhost:5000/api/contact";

export const sendContactForm = (data: any) => {
  return axios.post(API_URL, data);
};
