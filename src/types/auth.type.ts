export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    phone: string;
}

export type RegisterUser = Omit<User, "id">;

export type LoginUser = Pick<User, "email" | "password">;
