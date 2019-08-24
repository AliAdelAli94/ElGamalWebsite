import { ImageDTO } from './ImageDTO.model';
import { ProductOptionDTO } from './ProductOptionDTO.model';
import { CommentDTO } from './CommentDTO.model';

export class GetProductById 
{
    ID: string;
    name: string;
    priceBefore?: string;
    priceAfter?: string;
    description: string;
    rate: number;
    categoryID?: string;
    parentCategoryName: string;
    discountPercentage: string;
    images: ImageDTO[]=new Array();
    ProductOptions: ProductOptionDTO[]=new Array();
    Comments: CommentDTO[]=new Array();
    
}