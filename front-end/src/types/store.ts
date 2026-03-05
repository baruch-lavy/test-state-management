import type { MovieSlice } from "@/store/moviesStore";

export type Store = MovieSlice;

export type StoreMiddlewares = [["zustand/devtools", never], ["zustand/immer", never]];