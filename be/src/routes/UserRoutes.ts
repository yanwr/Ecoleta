import Express, { Request, Response} from 'express';
import UserController from '../controllers/UserController';

const routes = Express.Router();
const userController = new UserController();

routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.post('/users', userController.store);
routes.put('/users', userController.update);
routes.delete('/users', userController.delete);

export default routes;
