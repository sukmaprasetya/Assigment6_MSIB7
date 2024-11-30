import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieCard } from "./components/MovieCard";
import { Navbar } from "./components/Navbar";
import styles from "./App.module.css";

const API_KEY = "27d345b8";

const API_RESPONSE_STATUSES = {
  TRUE: "true",
  FALSE: "false",
};

function App() {
  const [searchMoviesKeyword, setSearchMoviesKeyword] = useState("movie");
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);

  const fetchMovies = async () => {
    try {
      const apiURL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchMoviesKeyword}`;
      const response = await fetch(apiURL);
      const respJSON = await response.json();

      if (
        !response.ok ||
        (respJSON.Response && 
        respJSON.Response.toLowerCase() === API_RESPONSE_STATUSES.FALSE)
      ) {
        throw respJSON;
      }

      const result = [];
      
      if (respJSON.Search && Array.isArray(respJSON.Search)) {
        respJSON.Search.forEach((movie) => {
          result.push({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            type: movie.Type
          });
        });
      }

      dispatch({
        type: "INSERT_MOVIES",
        movies: result
      });

    } catch (err) {
      console.error("[fetchMovies]:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchMoviesKeyword]);

  const handleSearch = (keyword) => {
    setSearchMoviesKeyword(keyword);
  };

  return (
    <main className={styles.main}>
      <Navbar 
        onSearch={handleSearch}
      />
      <section className={styles.container}>
        <section className={styles.movieListContainer}>
          {movies && movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              poster={movie.poster}
            />
          ))}
        </section>
      </section>
    </main>
  );
}

export default App;