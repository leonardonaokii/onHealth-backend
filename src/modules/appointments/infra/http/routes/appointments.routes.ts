import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import doctorsAppointmentsRouter from '@modules/appointments/infra/http/routes/doctorsAppointments.routes';
import usersAppointmentsRouter from '@modules/appointments/infra/http/routes/usersAppointments.routes';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      doctor_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
      symptoms: Joi.number().required(),
      description: Joi.string().required(),
    },
  }),
  appointmentsController.create,
);

appointmentsRouter.use('/doctor', doctorsAppointmentsRouter);

appointmentsRouter.use('/user', usersAppointmentsRouter);

export default appointmentsRouter;