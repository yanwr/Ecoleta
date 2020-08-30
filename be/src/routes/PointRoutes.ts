import Express from 'express';
import PointController from '../controllers/PointController';

const routes = Express.Router();
const pointController = new PointController();

routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);
routes.post('/points', pointController.store);
routes.put('/points', pointController.update);
routes.delete('/points', pointController.delete);

export default routes;