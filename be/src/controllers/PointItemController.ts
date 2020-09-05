import { Request, Response } from 'express';
import PointItemServive from '../services/PointItemService';

const pointItemService = new PointItemServive();

export default class PointController {
    
    async showByCityUfItens(request: Request, response: Response){
        const { address_city, address_uf, itens } = request.query;
        const parseItensToArray:number[] = String(itens)
            .split(',')
            .map(item => Number(item.trim()));
        const pointsFound = await pointItemService.showByCityUfItens(parseItensToArray, address_city, address_uf);
        return response.json({ points: pointsFound});
    };
}