import axios from "axios";
import { baseUrl } from "..";

export default axios.create({
  baseURL: `${baseUrl}/api`,

});