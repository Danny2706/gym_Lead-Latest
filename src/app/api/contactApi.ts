import axios from "axios";

const API_URL = "https://gym-lead-latest-2.onrender.com/api/contact";

export const sendContactForm = (data: any) => {
  return axios.post(API_URL, data);
};
