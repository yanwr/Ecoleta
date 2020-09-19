import Express from 'express';
import Cors from 'cors';
import { errors as handleValidationsRoutes } from 'celebrate';

import ItemRoutes from './routes/ItemRoutes';
import UserRoutes from './routes/UserRoutes';
import PointRoutes from './routes/PointRoutes';
import PointItensRoutes from './routes/PointItemRoutes';

const api = Express();

api.use(Cors());
api.use(Express.json());
api.use(
    UserRoutes, 
    PointItensRoutes, 
    PointRoutes, 
    ItemRoutes
);
api.use(handleValidationsRoutes());
api.listen(3333);