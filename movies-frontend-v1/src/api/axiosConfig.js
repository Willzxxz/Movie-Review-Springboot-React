import axios from "axios";

export default axios.create({
  baseURL: "https://a0ad-2804-14d-bad5-a4a7-00-1000.ngrok-free.app",
  headers: { "ngrok-skip-browser-warning": "true" },
});
