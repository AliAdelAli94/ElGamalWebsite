export class ProductFilterDTO {
    
    CategoryID: string;

    PriceFrom?: string;

    PriceTO?: string;

    CategoriesIDs: string[];

    SortingType?: number;

    NamePart: string;

    PageNumber: number;
}