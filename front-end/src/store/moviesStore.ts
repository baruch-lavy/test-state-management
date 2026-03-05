import type { Movie } from "@/types/movies";
import type { StateCreator } from "zustand";
import type { Store, StoreMiddlewares } from "@/types/store";

type seatSelection =  {id: string; seatNumbers: object}
type seatNumbers = { x:number,  y:number}
type MoviesState = {
    movies: Movie[];
    moviesCopy: Movie[]
    isLoading: boolean
    error: any
    searchQuery: string
    seatSelections: seatSelection[]
}

type MoviesAction = {
   setMovies: (movies: Movie[]) => void;
   setSearchQuery: (value : string) => void;
   setLoading: (boolean : boolean) => void;
   setError: (message : string | null) => void;
   selectSeat: (movieId: string, seatNumbers: seatNumbers, seatId: number) => void;
   loadSeatSelectionsFromStorage: () => seatSelection[]
   filterMovies: (filterBy: string) => void
}

const initialState: MoviesState = {
    movies: [],
    moviesCopy: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    seatSelections: []
}

export type MovieSlice = MoviesState & MoviesAction;

export const createMoviesSlice: StateCreator<Store, StoreMiddlewares, [], MovieSlice> = (set, get) => ({
    ...initialState,
    setMovies: (movies) => set((state) => {
        state.movies = [...movies];
        state.moviesCopy = [...movies]
    }, false, "setMovies"),
    setSearchQuery: (query) => set((state) => {
        state.searchQuery = query
    }, false, "setSearch query"),
    filterMovies: (query) => set((state) => {
        if (query !== '') {
            const filteredMovies = state.movies.filter(movie => {
                return (movie.Title.toLocaleLowerCase().includes(query) || movie.Genre.toLocaleLowerCase().includes(query))
            })
            state.movies = filteredMovies
        } else {
            state.movies = state.moviesCopy
        }
    }, false, "filterMovies"),
    setLoading: (isLoading) => set((state) => {
        state.isLoading = isLoading
    }, false, "setLoading"),
    setError: (error) => set((state) => {
        if (error) state.error = error
    }, false, "setError"),
    selectSeat: (movieID, seatNumbers, seatId) => set((state) => {
        const movieIdx = state.seatSelections.findIndex(movie => movie.id === movieID)
        if (movieIdx !== -1) {
            state.seatSelections[movieIdx].seatNumbers = seatNumbers
            const movieIndex = state.movies.findIndex(movie => movie.imdbID === movieID)
            const seatsIdx = state.movies[movieIndex].seats.findIndex(seat => {
                return seat.id === seatId
            })
            state.movies[movieIndex].seats[seatsIdx].isTaken = true
        } else {
            state.seatSelections.push({id: movieID, seatNumbers: seatNumbers})
        }
    }, false, 'setSeats'),
    loadSeatSelectionsFromStorage: () => {
        return get().seatSelections
    }, 
});
