import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Doctor from '../../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../../repositories/IDoctorsRepository';

interface IRequest {
  id: string;
  type: string;
}

@injectable()
class ShowDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({ id, type }: IRequest): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findById(id);

    if (!doctor) {
      throw new AppError('User not found!');
    }

    if (type !== 'doctor') {
      throw new AppError('User type does not match!');
    }

    return doctor;
  }
}

export default ShowDoctorService;
