import type { Movie } from "@/types/movies";
import type { StateCreator } from "zustand";
import type { Store, StoreMiddlewares } from "@/types/store";

type seatNumbers = { x:number,  y:number}
type seatSelection =  {id: string; seatNumbers: seatNumbers, seatId: number}
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
        const stateMovieIdx = state.seatSelections.findIndex(movie => movie.id === movieID)
        if (stateMovieIdx !== -1) {
            // change the prev seat
            const prevSeatIdx = get().seatSelections[stateMovieIdx].seatId

            // find the movie index in the movies array and change the seat status
            const movieIndex = state.movies.findIndex(movie => movie.imdbID === movieID)
            state.movies[movieIndex].seats[prevSeatIdx].isTaken = false
            state.movies[movieIndex].seats[seatId].isTaken = true

            // change the seat selection in the seatSelections array
            state.seatSelections[stateMovieIdx].seatNumbers = seatNumbers
            state.seatSelections[stateMovieIdx].seatId = seatId
        } else {
            state.seatSelections.push({id: movieID, seatNumbers, seatId})
        }
    }, false, 'setSeats'),
    loadSeatSelectionsFromStorage: () => {
        return get().seatSelections
    }, 
});
