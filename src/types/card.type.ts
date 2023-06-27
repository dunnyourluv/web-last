import { User } from "./auth.type";

export interface CardType {
    id: string;
    user: User;
    title: string;
    description: string;
    images: string[];
    location: string;
    type: string;
}
