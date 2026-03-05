import type { UserState } from "@/store/userSlice";

const fetchUserData = async (): Promise<UserState> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                username: "John Doe",
                fullName: "Johnathan Doe",
                address: "123 Main St, Anytown, USA",
                age: 30,
            });
        }, 500);
    });
}

export { fetchUserData };