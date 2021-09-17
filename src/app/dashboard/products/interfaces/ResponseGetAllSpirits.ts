import { Spirit } from "./Spirit";

export interface ResponseGetAllSpirits
{
    total: number;
    spirits: Spirit[];
}