import fs from "fs/promises";
import path from "path";


const MOVIES_FILE_PATH = path.join(process.cwd(), "data", "movies.json");
const SEATS_FILE_PATH = path.join(process.cwd(), "data", "seats.json");

export const DataSetService = {
  getData,
};

async function getData() {
  try {
    const movies  = await fs.readFile(MOVIES_FILE_PATH, 'utf-8')
    const seats  = await fs.readFile(SEATS_FILE_PATH, 'utf-8')
    const moviesWithSeats = filterSeats(JSON.parse(movies), JSON.parse(seats))
    console.log(moviesWithSeats)
    return moviesWithSeats
  } catch (err) {
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

function filterSeats(movies, seats) {
  const seatsIds = Object.keys(seats)
  const moviesWithSeats = []
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const movieSeatsKey = seatsIds.find(seatsId => seatsId === movie.imdbID)
    moviesWithSeats.push({...movie, seats: seats[movieSeatsKey]})
  }

  return moviesWithSeats
}

