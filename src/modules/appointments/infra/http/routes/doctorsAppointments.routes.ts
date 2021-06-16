import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DoctorAppointmentsController from '@modules/appointments/infra/http/controllers/DoctorAppointmentsController';
import DoctorMonthAvailabilityController from '@modules/appointments/infra/http/controllers/DoctorMonthAvailabilityController';
import DoctorDayAvailabilityController from '@modules/appointments/infra/http/controllers/DoctorDayAvailabilityController';

const doctorsRouter = Router();

const doctorAppointmentsController = new DoctorAppointmentsController();
const doctorMonthAvailabilityController = new DoctorMonthAvailabilityController();
const doctorDayAvailabilityController = new DoctorDayAvailabilityController();

doctorsRouter.use(ensureAuthenticated);

doctorsRouter.get('/', doctorAppointmentsController.teste);

doctorsRouter.get(
  '/:doctor_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      doctor_id: Joi.string().uuid().required(),
    },
  }),
  doctorMonthAvailabilityController.index,
);

doctorsRouter.get(
  '/:doctor_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      doctor_id: Joi.string().uuid().required(),
    },
  }),
  doctorDayAvailabilityController.index,
);

doctorsRouter.get('/teste', doctorAppointmentsController.index);

export default doctorsRouter;
