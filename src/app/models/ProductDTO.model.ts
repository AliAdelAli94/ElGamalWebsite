import { ImageDTO } from './ImageDTO.model';
import { CommentDTO } from './CommentDTO.model';

export class ProductDTO {
    ID: string;

    name: string;

    priceBefore?: number;

    priceAfter: number;

    discountPercentage?: string;

    description: string;

    rate?: number;

    rateArray? : number[] = new Array();

    categoryID?: string;

    parentCategoryName?: string;

    images: ImageDTO[] = new Array();

    productOptions : string;

    Comments?: CommentDTO[] = new Array();

    NumberOfItems : number;

}