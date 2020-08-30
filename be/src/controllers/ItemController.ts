import { Request, Response } from 'express';
import ItemService from '../services/ItemService';

const itemService = new ItemService();

export default class ItemController {
    
    async index(request:Request, response:Response) {
        try {
            const itens = await itemService.index();
            return response.json(itens);
        } catch (error) {
            return response.json({ error: true });
        }
    };
}