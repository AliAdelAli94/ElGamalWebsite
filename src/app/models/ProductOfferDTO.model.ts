import { ImageDTO } from './ImageDTO.model';

export class ProductOfferDTO {
    ID: string;
    name: string;
    priceBefore?: string;
    priceAfter?: string;
    description: string;
    rate: string;
    categoryID?: string;
    parentCategoryName: string;
    images: ImageDTO[]=new Array();
}