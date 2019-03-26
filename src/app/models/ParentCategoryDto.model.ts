import { Category } from './category.model';

export class ParentCategoryDto {
    ID: string;
    name: string;
    parentCategoryID?: string;
    childCategories: Category[]=new Array();
}