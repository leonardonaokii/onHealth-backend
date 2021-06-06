import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDoctorsRepository from '../../repositories/IDoctorsRepository';
import Doctor from '../../infra/typeorm/entities/Doctor';

interface IRequest {
  id: string;
  type: 'user' | 'doctor';
  crm: string;
  medical_specialty: number;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({
    id,
    type,
    crm,
    medical_specialty,
  }: IRequest): Promise<Doctor> {
    const checkDoctorExistsByCrm = await this.doctorsRepository.findByCrm(crm);

    if (checkDoctorExistsByCrm) {
      throw new AppError('Crm already used');
    }

    if (type !== 'doctor') {
      throw new AppError('Wrong user type.');
    }

    const doctor = this.doctorsRepository.create({
      id,
      crm,
      medical_specialty,
    });

    return doctor;
  }
}

export default CreateUserService;
