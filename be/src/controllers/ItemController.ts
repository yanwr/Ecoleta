import { Request, Response } from 'express';
import { ITEM_DTO } from '../models/dto/ItemDTO';
import ItemService from '../services/ItemService';

const itemService = new ItemService();

export default class ItemController {
    async index(request:Request, response:Response) {
        try {
            const itens:ITEM_DTO[] = await itemService.index();
            return response.json(itens);
        } catch (error) {
            return response.json({ error: error });
        }
    };
}