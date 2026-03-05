import { Button } from "./ui/button";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export function Movies() {
  const { movies, filterBy, setFilter, filterMovies } = useStore(
    useShallow((store) => ({
      movies: store.movies,
      filterBy: store.searchQuery,
      setFilter: store.setSearchQuery,
      filterMovies: store.filterMovies,
    })),
  );

  const setTimeOutId = useRef(0);
  const navigate = useNavigate()

  useEffect(() => {
    setTimeOutId.current = setTimeout(() => {
      filterMovies(filterBy);
    }, 350);
    return () => clearTimeout(setTimeOutId.current);
  }, [filterBy]);

  function setFilterBy(e: any) {
    setFilter(e.target.value);
  }

  function navigateToMovie(id :string) {
    navigate(`/${id}`)
  }

  return (
    <div className="movies-container flex flex-col p-2">
      <label htmlFor="filter" className="">
        Filter:
      </label>
      <input
        type="text"
        id="filter"
        value={filterBy !== "" ? filterBy : ""}
        onChange={setFilterBy}
        placeholder="filter by title or genre"
        className="p-2 mt-2 mb-3 border-s-rose-400"
      />
      <div className="grid grid-cols-4">
        {movies.map((movie) => (
          <Card
            key={crypto.randomUUID()}
            className="flex flex-col h-25 w-25"
            onClick={() => navigateToMovie(movie.imdbID)}
          >
            <CardHeader className="flex flex-row items-center gap-2">
              <CardTitle>
                <img src={movie.Images[0]} className="aspect-2/3" />
                {movie.Title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row justify-between">
                Year: {movie.Year}
              </div>
              <div>Runtime: {movie.Runtime}</div>
              <div>Genre: {movie.Genre}</div>
              <div>Language: {movie.Language}</div>
            </CardContent>
            <Button variant="destructive" size="lg">
              Select Seats
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
