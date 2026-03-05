import type { Movie } from "@/types/movies";
const BASE_URL = 'http://127.0.0.1:3033'

const fetchMovies = async (): Promise<Movie[]> => {
   const movies =  await fetch(BASE_URL + '/api/dataSet')
   return await movies.json()
}

export { fetchMovies };