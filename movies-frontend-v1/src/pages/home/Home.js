import Hero from "../../containers/hero/Hero";

const Home = ({ movies }) => {
  return (
    <>
      <Hero movies={movies} />
    </>
  );
};

export default Home;
