// api.js

// for API call with base url
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;