import ITEM from "../Item";
import { serializedData } from '../../utils/helpFunctions';

export interface ITEM_DTO extends ITEM {
    image_url:string;
};

export default class ItemDTO {

    private itens:ITEM[] = [];

    constructor(){};
    
    get get():ITEM_DTO[] {
        const data:ITEM_DTO[] = serializedData(this.itens, false);
        return data;
    };

    set set(item:ITEM) {
        this.itens.push(item);
    };
}