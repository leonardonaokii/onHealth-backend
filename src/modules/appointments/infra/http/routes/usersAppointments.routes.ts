import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UserAppointmentsController from '../controllers/UserAppointmentsController';

const usersRouter = Router();

const userAppointmentsController = new UserAppointmentsController();

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', userAppointmentsController.index);

export default usersRouter;
