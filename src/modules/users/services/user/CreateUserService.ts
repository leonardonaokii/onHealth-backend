import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../../infra/typeorm/entities/User';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../../repositories/IUsersRepository';
import ICreateUserDTO from '../../dtos/usersDTO/ICreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    first_name,
    last_name,
    email,
    password,
    cpf,
    phone,
    type,
  }: ICreateUserDTO): Promise<User> {
    const checkUserExistsByEmail = await this.usersRepository.findByEmail(
      email,
    );

    if (checkUserExistsByEmail) {
      throw new AppError('Email address already used.');
    }

    const checkUserExistsByCpf = await this.usersRepository.findByCpf(cpf);

    if (checkUserExistsByCpf) {
      throw new AppError('Cpf already used');
    }
    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      cpf,
      phone,
      type,
    });

    return user;
  }
}

export default CreateUserService;
