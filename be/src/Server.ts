import Express from 'express';
import Path from 'path';
import Cors from 'cors';

import ItemRoutes from './routes/ItemRoutes';
import UserRoutes from './routes/UserRoutes';
import PointRoutes from './routes/PointRoutes';
import PointItensRoutes from './routes/PointItemRoutes';

const api = Express();


api.use(Cors());
api.use(Express.json());

api.use('/upload', Express.static(
    Path.resolve(
    __dirname, '..', 'tmp', 'imgItem'
    )
));

api.use(UserRoutes, PointItensRoutes, PointRoutes, ItemRoutes);

api.listen(3333);