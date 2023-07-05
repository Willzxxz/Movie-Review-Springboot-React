import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Trailer from "./pages/trailer/Trailer";
import Reviews from "./pages/reviews/Reviews";
import NotFound from "./pages/notfound/NotFound";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./api/actions/authActions";

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();
  const dispatch = useDispatch();
  const { usernameAfterLogin, emailAfterLogin } = useSelector(
    (state) => state.user
  );

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    // Check if a token exists in localStorage or sessionStorage
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      // Dispatch the login action to update the Redux state with the stored token
      dispatch(login(storedToken));
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                reviews={reviews}
                setReviews={setReviews}
                movie={movie}
              />
            }
          />
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
