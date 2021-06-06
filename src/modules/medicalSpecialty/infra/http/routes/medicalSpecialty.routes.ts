import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import MedicalSpecialtiesControllers from '../controllers/MedicalSpecialtiesControllers';

const medicalSpecialtiesRouter = Router();

const medicalSpecialtiesControllers = new MedicalSpecialtiesControllers();

medicalSpecialtiesRouter.get('/', medicalSpecialtiesControllers.index);

medicalSpecialtiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  medicalSpecialtiesControllers.create,
);

export default medicalSpecialtiesRouter;
