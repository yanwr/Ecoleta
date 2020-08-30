import repository from '../database/RepositoryConnection';
import { TABLE_NAME } from '../database/models/02_COLLECT_ITEM';

export default class ItemService {

    async index() {
        const items:any[] = await repository(TABLE_NAME).select('*');
        const itemDTO = items.map( item => {
            const { id, name, image} = item;
            return {
                id,
                name,
                image_url: `http://192.168.0.15:3333/upload/${image}`,
            };
        });
        return itemDTO;
    };
}