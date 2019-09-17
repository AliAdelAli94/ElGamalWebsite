import { ImageDTO } from './ImageDTO.model';

export class OrderProductDTO {

    public buyingPrice: number;

    public quantity: number;

    public productID: string;

    public name: string;

    public description: string;

    public image : ImageDTO;

    public NumberOfItems : number;



}