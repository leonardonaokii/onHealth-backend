import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/user/CreateUserService';
import { classToClass } from 'class-transformer';
import UpdateUserService from '@modules/users/services/user/UpdateUserService';
import ShowUserService from '@modules/users/services/user/ShowUserService';

class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      first_name,
      last_name,
      email,
      password,
      cpf,
      phone,
      type,
    } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      first_name,
      last_name,
      email,
      password,
      cpf,
      phone,
      type,
    });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const {
      first_name,
      last_name,
      email,
      password,
      old_password,
      birth_date,
      gender,
      phone,
      country,
      administrative_area,
      locality,
      thoroughfare,
      zipcode,
    } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      id,
      first_name,
      last_name,
      email,
      password,
      old_password,
      birth_date,
      gender,
      phone,
      country,
      administrative_area,
      locality,
      thoroughfare,
      zipcode,
    });

    return response.json(classToClass(user));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute(id);

    return response.json(classToClass(user));
  }
}

export default UsersControllers;
