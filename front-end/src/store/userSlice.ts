import { type StateCreator } from "zustand";
import type { Store, StoreMiddlewares } from "@/types/store";

export type UserState = {
    username: string;
    fullName: string;
    age: number;
    address: string;
}

type UserAction = {
    setAddress: (address: string) => void;
    setAge: (age: number) => void;
    setFullName: (fullName: string) => void;
    setUsername: (username: string) => void;
}

export type UserSlice = UserState & UserAction;

export const createUserSlice: StateCreator<Store, StoreMiddlewares, [], UserSlice> = (set) => ({
    username: '',
    fullName: '',
    age: 0,
    address: '',
    setAddress: (address) => set((state) => {
        state.address = address;
    }),
    setAge: (age) => set((state) => {
        state.age = age;
    }),
    setFullName: (fullName) => set((state) => {
        state.fullName = fullName;
    }),
    setUsername: (username) => set((state) => {
        state.username = username;
    }),
});