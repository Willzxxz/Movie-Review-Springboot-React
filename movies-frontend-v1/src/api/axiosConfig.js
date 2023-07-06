import axios from "axios";

export default axios.create({
  baseURL: "https://java-springboot-backend-movie-11ae84b7d6c1.herokuapp.com",
  headers: { "ngrok-skip-browser-warning": "true" },
});
