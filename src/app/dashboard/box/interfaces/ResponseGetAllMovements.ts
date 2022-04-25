import { Movement } from "./Movement";

export interface ResponseGetAllMovements
{
    total: number;
    movements: Movement[];
}