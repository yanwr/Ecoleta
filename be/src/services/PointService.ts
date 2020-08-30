import repository from '../database/RepositoryConnection';
import {TABLE_NAME as POINT } from '../database/models/01_COLLECT_POINT';
import { TABLE_NAME as POINT_ITEM } from '../database/models/03_COLLECT_POINT_ITEM';
import { TABLE_NAME as ITEM } from '../database/models/02_COLLECT_ITEM';

export default class PointService {

    async index(filterPoints:number[], address_city:any, address_uf:any) {
        try {
            const pointsFound = await repository(POINT)
                .join(POINT_ITEM, `${POINT}.id`, "=", `${POINT_ITEM}.point_id`)
                .whereIn(`${POINT_ITEM}.item_id`, filterPoints)
                .where('address_city', String(address_city))
                .where('address_uf', String(address_uf))
                .distinct().select(`${POINT}.*`);
            return pointsFound;
        } catch (error) {
            
        }
    };

    async show(id:string | number) {
        try {
            const point = await repository(POINT).where('id', id).first();
            const itens = await repository(ITEM)
                .join(POINT_ITEM, `${ITEM}.id`, '=', `${POINT_ITEM}.item_id`)
                .where(`${POINT_ITEM}.point_id`, id).select(`${ITEM}.name`);
            return {...point, itens };
        } catch (error) {
            return {error: true};
        }
    };

    async store(point:{}, itens:[]) {
        try {
            const trx = await repository.transaction();
            
            const pointId = await trx(POINT).insert(point);
            const pointItens = itens.map((item_id:number) => {
                return {
                    item_id,
                    point_id: pointId[0],
                };
            });
            await trx(POINT_ITEM).insert(pointItens);
            await trx.commit();
            const newPointSaved = {id: pointId[0], ...point};
            return newPointSaved;
        } catch (error) {
            console.log(error);
        }
    };

    async update() {};

    async delete() {};
}