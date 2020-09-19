import {Request, Response} from 'express';
import UserService from '../services/UserService';
import User from '../models/User';

const userService = new UserService();

export default class UserController {

    async index(request:Request, response:Response) {};

    async show(request:Request, response:Response) {
        const userId = request.params.id;
        const currentUser:User[] = await userService.show(userId);
        return response.json(currentUser);
    };

    async store(request:Request, response:Response) {
        const { name, email, whatsapp, password, id = null } = request.body;
        const user:User = { id, name, email, whatsapp, password };
        const userDTO = await userService.store(user);
        return response.json(userDTO);
    };

    async update(request:Request, response:Response) {};

    async delete(request:Request, response:Response) {};
}