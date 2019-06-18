export class CategoryDTO
{
    ID: string;
    name: string;
    parentCategoryID?: string;
    checked : boolean = false;
}