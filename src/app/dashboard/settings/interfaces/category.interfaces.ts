export interface ResponseGetAllCategories
{
    total: number;
    categories: Category[];
};

export interface Category
{
    _id?: string; //Aveces llega de esta manera el ID.
    id: string;
    name: string;
    state: boolean;
};