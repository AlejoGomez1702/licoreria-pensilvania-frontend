import { Provider } from "./Provider";

export interface ResponseGetAllProviders
{
    total: number;
    providers: Provider[];
}