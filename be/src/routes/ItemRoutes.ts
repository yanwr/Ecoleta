import Path from 'path';
import Express from 'express';
import ItemController from '../controllers/ItemController';

export const URL_GET_IMAGE = '/itens/image';

const routes = Express.Router();
const itemController = new ItemController();

routes.get('/itens', itemController.index);
routes.use(URL_GET_IMAGE, Express.static(
    Path.resolve(
        __dirname, '..', '..', 'tmp', 'imgItem'
    )
));

export default routes;