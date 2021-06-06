import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SessionsControllers from '../controllers/SessionsControllers';

const sessionsRouter = Router();

const sessionsControllers = new SessionsControllers();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsControllers.create,
);

export default sessionsRouter;
