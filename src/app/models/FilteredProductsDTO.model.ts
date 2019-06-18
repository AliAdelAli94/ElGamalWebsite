import { ProductDTO } from './ProductDTO.model';
import { CategoryDTO } from './CategoryDTO.model';

export class FilteredProductsDTO {
    
    Products: ProductDTO[] = new Array();

    NumberOfAllItems: string;

    NumerOfPages: number;

    NumerOfPagesArray : number[] = new Array();

    NumberOfCurrentItems: number;

    Brands: CategoryDTO[] = new Array();

    MaxPriceValue : string;

}