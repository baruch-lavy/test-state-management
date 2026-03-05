import './App.css'
import { useEffect } from "react";
import { fetchMovies } from "./api/movies.api";
import { useStore } from "./store/store";
import { useShallow } from "zustand/react/shallow";
import { Routes, Route, BrowserRouter } from "react-router";

import { Movies } from "./components/Movies";
import { Movie } from './components/Movie';
import { Seats } from './components/Seats';


function App() {
  const { setMovies, setLoading, setError, error, isLoading } = useStore(
    useShallow((store) => ({
      setMovies: store.setMovies,
      setLoading: store.setLoading,
      setError: store.setError,
      error: store.error,
      isLoading: store.isLoading
    })),
  );

  useEffect(() => {
    setLoading(true)
    fetchMovies()
      .then((movies) => setMovies(movies))
      .then(() => setLoading(false))
      .catch((err) => setError(JSON.stringify(err)));
  }, []);

  if(isLoading) return <div>Loading...</div>

  if(error) return <div>{JSON.stringify(error)}</div>

  return (
    <div className="main-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path=":id" element={<Movie />} />
          <Route path="/seats/:id" element={<Seats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
