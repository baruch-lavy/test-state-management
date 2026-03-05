import type { CartSlice } from "@/store/moviesStore";
import type { UserSlice } from "@/store/userSlice";

export type Store = UserSlice & CartSlice;

export type StoreMiddlewares = [["zustand/devtools", never], ["zustand/immer", never]];