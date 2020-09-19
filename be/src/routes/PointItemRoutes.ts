import Express from 'express';
import PointController from '../controllers/PointItemController';
import validation from '../services/RoutesValidationService';

const routes = Express.Router();
const pointController = new PointController();

routes.get(
    '/points/itens',
    validation.pointsItens.filter,
    pointController.showByCityUfItens);

export default routes;