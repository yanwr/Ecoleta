import { Request, Response } from 'express';
import PointServive from '../services/PointService';

const pointService = new PointServive();

export default class PointController {
    
    async index(request: Request, response: Response){
        const pointsFound = await pointService.index();
        return response.json({ points: pointsFound});
    };
    
    async show(request: Request, response: Response){
        try {
            const { id } = request.params;
            const point = await pointService.show(id);
            if(!point){
                return response.status(400).json({ message: `Point ${id} not found !`});
            };
            return response.json(point);
        } catch (error) {
            return response.json({ error: true });
        }
    };
    
    async store(request: Request, response: Response){
        try {
            const { name, user_id, email, image, address_latitude, address_longitude,
                address_number, address_city, address_uf, itens } = request.body;
            const point = {
                name,
                user_id,
                email,
                image,
                address_latitude,
                address_longitude,
                address_number,
                address_city,
                address_uf
            };
            const pointSaved = await pointService.store(point, itens);
    
            return response.json(pointSaved);
        } catch (error) {
            console.log(error);
            return response.status(400).json({ error: error})
        }
    };

    async update(request: Request, response: Response){
        try {

        } catch (error) {

        }
    };
    
    async delete(request: Request, response: Response){
        try {

        } catch (error) {

        }
    };
}