import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import DoctorsControllers from '../controllers/DoctorsControllers';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const doctorsRouter = Router();

const doctorsControllers = new DoctorsControllers();

doctorsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      crm: Joi.string().required(),
      medical_specialty: Joi.number().required(),
      type: Joi.string().required(),
    },
  }),
  doctorsControllers.create,
);

doctorsRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      medical_specialty: Joi.number().required(),
    },
  }),
  doctorsControllers.update,
);

doctorsRouter.get('/', ensureAuthenticated, doctorsControllers.show);

doctorsRouter.get('/all', ensureAuthenticated, doctorsControllers.list);

doctorsRouter.get('/crm-availability/:crm', doctorsControllers.crmAvailability);

export default doctorsRouter;
