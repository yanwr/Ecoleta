import {Request, Response} from 'express';
import UserService from '../services/UserService';
import User from '../models/User';

const userService = new UserService();

export default class UserController {

    async index(request:Request, response:Response) {};

    async show(request:Request, response:Response) {
        try {
            const userId = request.params.id;
            const currentUser:User[] = await userService.show(userId);
            return response.json(currentUser);
        } catch (error) {
            
        }
    };

    async store(request:Request, response:Response) {
        try {
            const { name, email, whatsapp, password, id = null } = request.body;
            const user:User = { id, name, email, whatsapp, password };
            const userDTO = await userService.store(user);
            return response.json(userDTO);
        } catch (error) {
            
        }
    }

    async update(request:Request, response:Response) {};

    async delete(request:Request, response:Response) {};
}