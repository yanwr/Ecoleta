import Express from 'express';
import Path from 'path';
import Multer from 'multer';
import uploadImgConfig from '../config/UploadImgConfig';
import PointController from '../controllers/PointController';
import validation from '../services/RoutesValidationService';

export const URL_GET_IMAGE = '/points/image';

const routes = Express.Router();
const pointController = new PointController();
const uploadImage = Multer(uploadImgConfig);

routes.get('/points', pointController.index);
routes.get(
    '/points/:id',
    validation.points.show,
    pointController.show
);
routes.post(
    '/points',
    validation.points.create,
    pointController.store
);
routes.post(
    '/points/upload/image',
    uploadImage.single('image'),
    pointController.storeImage
);
routes.use(URL_GET_IMAGE, Express.static(
    Path.resolve(
        __dirname, '..', '..', 'tmp', 'imgPoint'
    )
));

export default routes;