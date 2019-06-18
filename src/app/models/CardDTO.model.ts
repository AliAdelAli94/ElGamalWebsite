import { ProductDTO } from './ProductDTO.model';

export class CardDTO {

    selectedProducts : ProductDTO[] = new Array();

    productsPrice : number = 0;

    shipingPrice : number = 0;

    totalPrice : number = 0;

}