import { ProductDTO } from './ProductDTO.model';

export class ProductDetailsDTO{
    public  CurrentProduct : ProductDTO = new ProductDTO();

    public  RelatedProducts : ProductDTO[] = new Array();
}