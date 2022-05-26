import { Establishment } from "./Establishment";

export interface User
{
    id: string;
    name: string;
    username: string;
    email: string;
    img?: string;
    rol: string;
    establishment: Establishment;
}