import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { Gender } from '@config/enums';
import User from '../../infra/typeorm/entities/User';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../../repositories/IUsersRepository';
import IDoctorsRepository from '../../repositories/IDoctorsRepository';

interface IRequest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  old_password?: string;
  birth_date?: Date;
  gender?: Gender;
  phone: string;
  country?: string;
  administrative_area?: string;
  locality?: string;
  thoroughfare?: string;
  zipcode?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
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
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
      throw new AppError('E-mail already in use.');
    }

    Object.assign(user, {
      first_name,
      last_name,
      email,
      birth_date,
      gender,
      phone,
      country,
      administrative_area,
      locality,
      thoroughfare,
      zipcode,
    });

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
