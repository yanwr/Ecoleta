import repository from '../database/RepositoryConnection';
import {TABLE_NAME as POINT } from '../database/models/01_COLLECT_POINT';
import { TABLE_NAME as POINT_ITEM } from '../database/models/03_COLLECT_POINT_ITEM';
import PointDTO from '../models/dto/PointDTO';

export default class ItemService {
    async showByCityUfItens(filterItens:number[], address_city:any, address_uf:any) {
        try {
            const points = await repository(POINT)
                .join(POINT_ITEM, `${POINT}.id`, "=", `${POINT_ITEM}.point_id`)
                .whereIn(`${POINT_ITEM}.item_id`, filterItens)
                .where('address_city', String(address_city))
                .where('address_uf', String(address_uf))
                .distinct().select(`${POINT}.*`);
            const pointDTO = new PointDTO();
            points.map( point => { pointDTO.set = point; });
            return pointDTO.get;
        } catch (e) {
            console.log('erroe aq', e);
            return e;
        }
    };
}