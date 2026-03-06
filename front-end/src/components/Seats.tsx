import { useParams } from "react-router";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import type { Movie } from "@/types/movies";

type seat = {
  id: number;
  numberX: number;
  numberY: number;
  isTaken: boolean;
};

export function Seats() {
  const { id } = useParams();

  const { movies, selectSeat, seatsSelections, loadSeats } = useStore(
    useShallow((store) => ({
      movies: store.movies,
      selectSeat: store.selectSeat,
      seatsSelections: store.seatSelections,
      loadSeats: store.loadSeatSelectionsFromStorage,

    })),
  );

  const movie: Movie | undefined = movies.find((movie) => movie.imdbID == id);
  const seats: seat[] | undefined = movie?.seats;

  const storedSeats = loadSeats();

  if (!movie) return <div>not found</div>;
  return (
    <>
      <h1>Select Seats</h1>
      <div className="grid grid-cols-5 gap-2 p-2">
        {seats?.map((seat) => (
          <div
            key={seat.id}
            className={
              seat.isTaken
                ? "bg-red-500 flex flex-col items-center cursor-pointer"
                : "bg-green-500 flex flex-col items-center cursor-pointer"
            }
            onClick={() =>
              selectSeat(movie.imdbID, { x: seat.numberX, y: seat.numberY }, seat.id)
            }
          >
            <span>{`${seat.numberX}, ${seat.numberY}`}</span>
            <span>{seat.id}</span>
          </div>
        ))}
      </div>
      <div>
        <h3 className="bg-green-500">Your seat is:</h3>
        {storedSeats.map((selection) => (
          <div key={selection.id} className="bg-green-300 p-2 m-2">
            {selection.id === movie.imdbID && (
              <span>{`Your seat for this movie: ${selection.seatNumbers.x}, ${selection.seatNumbers.y}`}</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
