import axios from "axios";

const baseUrl = import.meta.env.REACT_APP_API_URL || "http://127.0.0.1:8000"
// export const baseUrl = "";

export default axios.create({
  baseURL: `${baseUrl}/api`,

});