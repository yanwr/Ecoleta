import Express from 'express';
import ItemController from '../controllers/ItemController';

const routes = Express.Router();
const itemController = new ItemController();

routes.get('/itens', itemController.index);

export default routes;