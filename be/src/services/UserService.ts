import repository from '../database/RepositoryConnection';
import { TABLE_NAME } from '../database/models/00_USER';
import User from '../models/User';

export default class ItemService {

    async index() {};

    async show(userId:string) {
        try {
            const currentUser:User[] = await repository(TABLE_NAME)
                                        .where('id', '=', userId)
                                        .select('*');
            return currentUser;
        } catch (e) {
            
        }
    };

    async store(user:User) {
        const saveUser:User = await repository(TABLE_NAME).insert(user);
        return saveUser;
    };

    async update() {};

    async delete() {};
}