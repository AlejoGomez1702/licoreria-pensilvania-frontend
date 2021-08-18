import { User } from "src/app/core/interfaces/User";

export interface LoginResponse
{
    user: User;
    token: string;
}