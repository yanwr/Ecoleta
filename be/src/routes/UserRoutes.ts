import Express from 'express';
import UserController from '../controllers/UserController';
import validation from '../services/RoutesValidationService';

const routes = Express.Router();
const userController = new UserController();

routes.get('/users', userController.index);
routes.get(
    '/users/:id',
    validation.users.show,
    userController.show
);
routes.post(
    '/users',
    validation.users.create,
    userController.store
);
routes.put('/users', userController.update);
routes.delete('/users', userController.delete);

export default routes;
