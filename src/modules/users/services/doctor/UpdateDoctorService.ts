import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDoctorsRepository from '../../repositories/IDoctorsRepository';
import Doctor from '../../infra/typeorm/entities/Doctor';

interface IRequest {
  id: string;
  type: string;
  medical_specialty: number;
}

@injectable()
class UpdateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({
    id,
    type,
    medical_specialty,
  }: IRequest): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findById(id);

    if (!doctor) {
      throw new AppError('Doctor not found');
    }

    console.log(`tipo: ${type}`);

    if (type !== 'doctor') {
      throw new AppError('User type does not match!');
    }

    doctor.medical_specialty = medical_specialty;

    await this.doctorsRepository.save(doctor);

    return doctor;
  }
}

export default UpdateDoctorService;
