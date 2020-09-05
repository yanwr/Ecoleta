import Express from 'express';
import PointController from '../controllers/PointItemController';

const routes = Express.Router();
const pointController = new PointController();

routes.get('/points/itens', pointController.showByCityUfItens);

export default routes;