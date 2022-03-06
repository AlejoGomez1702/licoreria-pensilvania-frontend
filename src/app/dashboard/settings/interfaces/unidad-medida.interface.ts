export interface Unit
{
    _id?: string; //Aveces llega de esta manera el ID.
    id: string;
    unit: string;
    units?: number;
    grams?: number;
    ml?: number;
}

export interface ResponseGetAllUnits
{
    total: number;
    units: Unit[];
};