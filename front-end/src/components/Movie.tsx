import { useNavigate, useParams } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import type { Movie } from "@/types/movies";

export function Movie() {
  const { id } = useParams();
  const navigate = useNavigate()

  const { movies } = useStore(
    useShallow((store) => ({
      movies: store.movies,
    })),
  );

  
  function navigateToSeats(id :string) {
    navigate(`/seats/${id}`)
  }

  const movie: Movie | undefined = movies.find(movie => movie.imdbID == id)

  if (!movie) return <div>not found</div>

  return (
    <div className="flex flex-col p-2">
        <Card key={crypto.randomUUID()} className="flex flex-col h-25 w-25">
          <CardHeader className="flex flex-row items-center gap-2">
            <CardTitle>
              <img src={movie.Images[0]} className="size-60" />
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
          <Button variant="destructive" size="lg" onClick={() => navigateToSeats(movie.imdbID)}>
            Select Seats
          </Button>
        </Card>
      </div>
  );
}
