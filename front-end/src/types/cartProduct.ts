import type { Movie } from "./movies";

export type CartProduct = Movie & {
    quantity: number;
}