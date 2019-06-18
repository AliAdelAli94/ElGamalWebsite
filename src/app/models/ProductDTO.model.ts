import { ImageDTO } from './ImageDTO.model';
import { ProductOptionDTO } from './ProductOptionDTO.model';
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

    ProductOptions?: ProductOptionDTO[] = new Array();

    Comments?: CommentDTO[] = new Array();

    NumberOfItems : number;

}