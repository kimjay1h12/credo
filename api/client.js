import axios from "axios";

export const config = {
  baseURL: "https://credoculture-api.up.railway.app/",
};

let token;
if (typeof window !== "undefined") token = localStorage.getItem("nd-rest-tkn");
const client = axios.create({
  baseURL: config.baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default client;
