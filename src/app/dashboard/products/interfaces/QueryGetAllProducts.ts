export interface QueryGetAllProducts
{
    supercategory: string; 
    category?: string; 
    onlyWithPriceProblems?: boolean;
    // Pagination
    limit?: number; 
    from?: number;
}