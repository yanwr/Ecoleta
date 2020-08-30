import repository from '../database/RepositoryConnection';
import { TABLE_NAME } from '../database/models/03_COLLECT_POINT_ITEM';
import Knex from 'knex';

export default class ItemService {
    // async store(pointItem:{}) {
    //     try{
    //         const newPointItem = await repository(TABLE_NAME).insert(pointItem);
    //         return newPointItem;
    //     } catch(e) {
    //         console.log(e);
    //     }
    // }

    async show() {};

    async store() {};

    async update() {};

    async delete() {};
}