import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import { Router } from 'express';

import uploadConfig from '@config/upload';
import UsersControllers from '../controllers/UsersControllers';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();

const usersControllers = new UsersControllers();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cpf: Joi.string().required(),
      phone: Joi.string().required(),
      type: Joi.string().required(),
    },
  }),
  usersControllers.create,
);

usersRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      password_confirmation: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.valid(Joi.ref('password')).required(),
      }),
      phone: Joi.string().required(),
      birth_date: Joi.date(),
      gender: Joi.number(),
      country: Joi.string(),
      administrative_area: Joi.string(),
      locality: Joi.string(),
      thoroughfare: Joi.string(),
      zipcode: Joi.string(),
    },
  }),
  usersControllers.update,
);

usersRouter.get('/', ensureAuthenticated, usersControllers.show);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
