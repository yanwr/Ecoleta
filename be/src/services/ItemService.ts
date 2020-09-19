import repository from '../database/RepositoryConnection';
import { TABLE_NAME } from '../database/models/02_COLLECT_ITEM';
import ItemDTO from '../models/dto/ItemDTO';

export default class ItemService {
    async index() {
        const items:any[] = await repository(TABLE_NAME).select('*');
        const itemDTO = new ItemDTO();
        items.map( item => { itemDTO.set = item; });
        return itemDTO.get;
    };
}