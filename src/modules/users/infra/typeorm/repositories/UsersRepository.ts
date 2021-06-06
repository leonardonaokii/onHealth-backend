import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/usersDTO/ICreateUserDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    first_name,
    last_name,
    email,
    password,
    cpf,
    phone,
    type,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      first_name,
      last_name,
      email,
      password,
      cpf,
      phone,
      type,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { cpf } });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { id } });

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
