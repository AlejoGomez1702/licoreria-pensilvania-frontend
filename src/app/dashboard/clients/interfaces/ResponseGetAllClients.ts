import { Client } from "./Client";

export interface ResponseGetAllClients
{
    total: number;
    clients: Client[];
}