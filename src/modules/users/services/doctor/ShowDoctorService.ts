import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { UserType } from '@config/enums';
import Doctor from '../../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../../repositories/IDoctorsRepository';

interface IRequest {
  id: string;
  type: UserType;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({ id, type }: IRequest): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findById(id);

    if (!doctor) {
      throw new AppError('User not found!');
    }

    if (type !== UserType.doctor) {
      throw new AppError('User type does not match!');
    }

    return doctor;
  }
}

export default ShowUserService;