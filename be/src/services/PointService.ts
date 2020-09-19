import repository from '../database/RepositoryConnection';
import { TABLE_NAME as TABLE_POINT } from '../database/models/01_COLLECT_POINT';
import { TABLE_NAME as TABLE_POINT_ITEM } from '../database/models/03_COLLECT_POINT_ITEM';
import { TABLE_NAME as TABLE_ITEM } from '../database/models/02_COLLECT_ITEM';
import { TABLE_NAME as TABLE_USER } from '../database/models/00_USER';
import { URL_GET_IMAGE } from '../routes/PointRoutes';
import PointDTO from '../models/dto/PointDTO';

export default class PointService {
    async index(){
        try {
            const points = await repository(TABLE_POINT)
                .join(TABLE_POINT_ITEM, `${TABLE_POINT}.id`, "=", `${TABLE_POINT_ITEM}.point_id`)
                .distinct().select(`${TABLE_POINT}.*`);
            const pointDTO = new PointDTO();
            points.map(point => { pointDTO.set = point; });
            return pointDTO.get;
        } catch (e) {
            console.log(e);
        }
    }

    async show(id:string | number) {
        try {
            const point = await repository(TABLE_POINT).where('id', id).first();
            const pointDTO = new PointDTO();
            pointDTO.set = {
                ...point,
                image_url: `http://192.168.0.15:3333${URL_GET_IMAGE}/${point.image}`
            }; 
            const user = await repository(TABLE_POINT)
                .join(TABLE_USER, `${TABLE_USER}.id`, '=', `${TABLE_POINT}.user_id`)
                .select([`${TABLE_USER}.id`, `${TABLE_USER}.name`, `${TABLE_USER}.whatsapp`, `${TABLE_USER}.email`])
                .where(`${TABLE_POINT}.id`, id)
                .first();
            const itens = await repository(TABLE_ITEM)
                .join(TABLE_POINT_ITEM, `${TABLE_ITEM}.id`, '=', `${TABLE_POINT_ITEM}.item_id`)
                .where(`${TABLE_POINT_ITEM}.point_id`, id).select([`${TABLE_ITEM}.id`, `${TABLE_ITEM}.name`]);
            return {...pointDTO.get[0], user, itens };
        } catch (e) {
            console.log(e);
            return {error: true};
        }
    };

    async store(point:{}, itens:[]) {
        try {
            const trx = await repository.transaction();
            
            const pointId = await trx(TABLE_POINT).insert(point);
            const pointItens = itens.map((item_id:number) => {
                return {
                    item_id,
                    point_id: pointId[0],
                };
            });
            await trx(TABLE_POINT_ITEM).insert(pointItens);
            await trx.commit();
            const newPointSaved = {id: pointId[0], ...point};
            return newPointSaved;
        } catch (e) {
            console.log(e);
        }
    };

    async update() {};

    async delete() {};
}