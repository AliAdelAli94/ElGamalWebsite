import { CardDTO } from './CardDTO.model';

export class OrderDTO {

    cartData: CardDTO = new CardDTO();
    userID: string;
    phone: string;
    address: string;

}