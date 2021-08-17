export interface ResponseGetAllCategories
{
    total: number;
    categories: Category[];
};

export interface Category
{
    id: string;
    name: string;
    state: boolean;
};