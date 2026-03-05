import type { Store } from "@/types/store";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createUserSlice } from "@/store/userSlice";
import { createMoviesSlice } from "@/store/moviesStore";
import { devtools, persist } from "zustand/middleware";
import { subscribeWithSelector } from "zustand/middleware";

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector(immer((...a) => ({
        ...createUserSlice(...a),
        ...createMoviesSlice(...a),
      }))),
      {
        name: "store",
      }
    )
  )
)

  