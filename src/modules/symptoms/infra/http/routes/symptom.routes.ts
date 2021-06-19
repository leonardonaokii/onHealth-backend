import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import SymptomsControllers from '../controllers/SymptomsControllers';

const symptomsRouter = Router();

const symptomsControllers = new SymptomsControllers();

symptomsRouter.get('/', symptomsControllers.index);

symptomsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  symptomsControllers.create,
);

export default symptomsRouter;
